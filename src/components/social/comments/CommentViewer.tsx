import { useApolloClient } from '@apollo/client';
import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Link, Stack, Text, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useCallback, useRef, useState } from 'react';
import { format } from 'timeago.js';
import { UserRole } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { useHandleClickOutside } from '../../../hooks/useHandleClickOutside';
import { UserProfilePageInfo } from '../../../pages/RoutesPageInfos';
import { UserKeyLinkStyleProps } from '../../lib/Typography';
import { PageLink } from '../../navigation/InternalLink';
import { UserAvatar, UserAvatarData } from '../../users/UserAvatar';
import { CommentInput } from './CommentInput';
import {
  CommentViewerDataFragment,
  CommentWithChildrenViewerDataFragment,
  useEditCommentMutation,
  useExpandCommentLazyQuery,
} from './CommentViewer.generated';
import { usePostCommentMutation } from './Discussion.generated';

export const CommentViewerData = gql`
  fragment CommentViewerData on Comment {
    _id
    contentMarkdown
    lastUpdatedAt
    postedAt
    postedBy {
      ...UserAvatarData
    }
    childrenCount
  }
  ${UserAvatarData}
`;

export const CommentWithChildrenViewerData = gql`
  fragment CommentWithChildrenViewerData on Comment {
    ...CommentViewerData
    children {
      ...CommentViewerData
    }
  }
  ${CommentViewerData}
`;

export const expandComment = gql`
  query expandComment($commentId: String!) {
    getCommentById(commentId: $commentId) {
      ...CommentViewerData
      children {
        ...CommentViewerData
        children {
          ...CommentViewerData
          children {
            ...CommentViewerData
            childrenCount
          }
        }
      }
    }
  }
  ${CommentViewerData}
`;

export const editComment = gql`
  mutation editComment($commentId: String!, $payload: EditCommentPayload!) {
    editComment(commentId: $commentId, payload: $payload) {
      ...CommentViewerData
    }
  }
  ${CommentViewerData}
`;

interface CommentViewerProps {
  discussionId: string;
  commentId: string;
}

export const CommentViewer: React.FC<CommentViewerProps> = ({ discussionId, commentId }) => {
  const client = useApolloClient();
  const { currentUser } = useCurrentUser();
  const [editCommentMutation] = useEditCommentMutation();

  const responsiveLayout = useBreakpointValue<'mobile' | 'desktop'>({
    base: 'mobile',
    xl: 'desktop',
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [mode, setMode] = useState<'reply' | 'edit' | null>(null);
  const [postCommentMutation] = usePostCommentMutation();

  const ref = useRef<HTMLDivElement>(null);
  useHandleClickOutside(ref, () => setMode(null));

  const [expandCommentLazyQuery, { data }] = useExpandCommentLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const expandComment = useCallback(() => {
    setIsExpanded(true);
    if (!commentChildren) {
      expandCommentLazyQuery({
        variables: {
          commentId,
        },
      });
    }
  }, []);

  const simpleComment = client.readFragment<CommentViewerDataFragment>({
    id: `Comment:${commentId}`,
    fragmentName: `CommentViewerData`,
    fragment: CommentViewerData,
  });

  // Should always be non null
  if (!simpleComment) {
    // can not just throw an error for now because it fails on logging out (when cache is cleared)
    console.error(`Expected Comment ${commentId} to be in cache with fragment CommentViewerData`);
    return null;
  }

  const commentWithChildren = client.readFragment<CommentWithChildrenViewerDataFragment>({
    id: `Comment:${commentId}`,
    fragmentName: `CommentWithChildrenViewerData`,
    fragment: CommentWithChildrenViewerData,
  });

  const comment: CommentViewerDataFragment = commentWithChildren || simpleComment; // The reason to do that is that we only query a DiscussionData fragment, so only that is reactive.
  // However we want to react on the 'children' property changes. Reading such fragments therefore work

  const commentChildren: CommentViewerDataFragment[] | null = commentWithChildren?.children || null;

  if (!comment.postedBy) {
    console.error(`No postedBy for comment ${comment._id} - should never happen`);
    return null;
  }

  return (
    <Flex direction="row" alignItems="stretch">
      {responsiveLayout === 'desktop' && (
        <Flex justifyContent="center" pr={1}>
          <UserAvatar user={comment.postedBy} size="sm" />
        </Flex>
      )}
      <Flex ref={ref} direction="column" flexGrow={1}>
        <Stack direction="row" alignItems="center" spacing="4px" mb="1px">
          {responsiveLayout === 'mobile' && <UserAvatar user={comment.postedBy} size="xs" />}
          <Stack direction="row" alignItems="baseline" spacing="6px">
            <PageLink
              pageInfo={UserProfilePageInfo(comment.postedBy)}
              {...UserKeyLinkStyleProps}
              color="gray.700"
              _hover={{}}
            >
              @{comment.postedBy.key}
            </PageLink>
            <Text fontWeight={700} color="gray.400" fontSize="sm">
              {format(comment.postedAt, 'en_US')}
            </Text>
          </Stack>
          {!mode && !!currentUser && (comment.postedBy._id === currentUser._id || currentUser.role === UserRole.Admin) && (
            <Tooltip label="Edit comment">
              <IconButton
                variant="ghost"
                aria-label="edit comment"
                icon={<EditIcon />}
                size="xs"
                onClick={() => setMode('edit')}
              />
            </Tooltip>
          )}
        </Stack>
        {mode === 'edit' ? (
          <Flex direction="column" alignItems="stretch" pt={2} px={2}>
            <CommentInput
              draftLocalStorageKey={`${discussionId}_${comment._id}_edit`}
              initialValue={comment.contentMarkdown}
              postButtonText="Save changes"
              post={async (content) => {
                await editCommentMutation({
                  variables: {
                    commentId,
                    payload: {
                      contentMarkdown: content,
                    },
                  },
                });
                setMode(null);
              }}
            />
          </Flex>
        ) : (
          <>
            <Box bgColor="gray.50" pt="6px" pb={2} pl={3} pr={4} borderRadius={6} minW="280px">
              <Text fontSize="15px" fontWeight={500}>
                {comment.contentMarkdown}
              </Text>
              {comment.lastUpdatedAt !== comment.postedAt && (
                <Text float="right" fontSize="sm" fontStyle="italic" fontWeight={500} color="gray.500">
                  Last edited {format(comment.lastUpdatedAt, 'en_US')}
                </Text>
              )}
            </Box>
            {mode === 'reply' ? (
              <Flex direction="column" alignItems="stretch" pt={2} px={2}>
                <CommentInput
                  draftLocalStorageKey={`${discussionId}_${comment._id}_reply`}
                  placeholder="Write your reply..."
                  post={async (content) => {
                    await postCommentMutation({
                      variables: {
                        payload: {
                          parentId: comment._id,
                          discussionId,
                          contentMarkdown: content,
                        },
                      },
                    });
                    setMode(null);
                  }}
                />
              </Flex>
            ) : (
              <Flex justifyContent="space-between" h={6} alignItems="center">
                {!!comment.childrenCount && (!commentChildren || !isExpanded) ? (
                  <Link fontWeight={600} color="gray.600" fontSize="sm" onClick={() => expandComment()}>
                    + More Replies
                  </Link>
                ) : (
                  <Box />
                )}
                <Link
                  onClick={() => setMode('reply')}
                  variant="ghost"
                  color="blue.600"
                  fontWeight={600}
                  fontSize="sm"
                  _hover={{ color: 'blue.500' }}
                >
                  Reply
                </Link>
              </Flex>
            )}
          </>
        )}

        {!!commentChildren?.length && isExpanded && (
          <Flex>
            <Box
              pl="2px"
              mr={responsiveLayout === 'desktop' ? 2 : 1}
              borderRightWidth={2}
              borderColor="gray.200"
              mb={0}
              _hover={{ cursor: 'pointer', borderColor: 'blue.500' }}
              onClick={() => setIsExpanded(false)}
            />
            <Stack flexGrow={1}>
              {commentChildren.map((child) => (
                <CommentViewer key={child._id} discussionId={discussionId} commentId={child._id} />
              ))}
            </Stack>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
