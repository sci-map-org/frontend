import { useApolloClient } from '@apollo/client';
import { Box, Flex, Link, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useCallback, useRef, useState } from 'react';
import { format } from 'timeago.js';
import { useHandleClickOutside } from '../../../hooks/useHandleClickOutside';
import { UserProfilePageInfo } from '../../../pages/RoutesPageInfos';
import { UserKeyLinkStyleProps } from '../../lib/Typography';
import { PageLink } from '../../navigation/InternalLink';
import { UserAvatar, UserAvatarData } from '../../users/UserAvatar';
import { CommentInput } from './CommentInput';
import {
  CommentViewerDataFragment,
  CommentWithChildrenViewerDataFragment,
  useExpandCommentLazyQuery,
} from './CommentViewer.generated';
import { usePostCommentMutation } from './Discussion.generated';

export const CommentViewerData = gql`
  fragment CommentViewerData on Comment {
    _id
    contentMarkdown
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

interface CommentViewerProps {
  discussionId: string;
  commentId: string;
}

export const CommentViewer: React.FC<CommentViewerProps> = ({ discussionId, commentId }) => {
  const client = useApolloClient();

  const simpleComment = client.readFragment<CommentViewerDataFragment>({
    id: `Comment:${commentId}`,
    fragmentName: `CommentViewerData`,
    fragment: CommentViewerData,
  });
  // Should always be non null
  if (!simpleComment) throw new Error(`Expected Comment ${commentId} to be in cache with fragment CommentViewerData`);

  const commentWithChildren = client.readFragment<CommentWithChildrenViewerDataFragment>({
    id: `Comment:${commentId}`,
    fragmentName: `CommentWithChildrenViewerData`,
    fragment: CommentWithChildrenViewerData,
  });

  const comment: CommentViewerDataFragment = commentWithChildren || simpleComment; // The reason to do that is that we only query a DiscussionData fragment, so only that is reactive.
  // However we want to react on the 'children' property changes. Reading such fragments therefore work

  const commentChildren: CommentViewerDataFragment[] | null = commentWithChildren?.children || null;

  const responsiveLayout = useBreakpointValue<'mobile' | 'desktop'>({
    base: 'mobile',
    xl: 'desktop',
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [replyMode, setReplyMode] = useState(false);
  const [postCommentMutation] = usePostCommentMutation();

  const ref = useRef<HTMLDivElement>(null);
  useHandleClickOutside(ref, () => setReplyMode(false));

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

  if (!comment.postedBy) {
    console.error(`No postedBy for comment ${comment._id} - should never happen`);
    return null;
  }

  return (
    // <Flex direction="column" alignItems="stretch">
    <Flex direction="row" alignItems="stretch">
      {responsiveLayout === 'desktop' && (
        <Flex justifyContent="center" pr={1}>
          <UserAvatar user={comment.postedBy} size="sm" />
        </Flex>
      )}
      <Flex direction="column" flexGrow={1}>
        <Stack direction="row" alignItems="baseline" spacing="6px" mb="1px">
          {responsiveLayout === 'mobile' && (
            // <Flex justifyContent="center">
            <UserAvatar user={comment.postedBy} size="xs" />
            // </Flex>
          )}
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
        <Text bgColor="gray.50" pt={1} pb={2} px={4} borderRadius={6} color="gray.700" minW="280px">
          {comment.contentMarkdown}
        </Text>
        {replyMode ? (
          <Flex direction="column" alignItems="stretch" ref={ref} pt={2} px={2}>
            <CommentInput
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
                setReplyMode(false);
              }}
            />
          </Flex>
        ) : (
          <Flex justifyContent="space-between" h={6} alignItems="center">
            {!!comment.childrenCount && (!commentChildren || !isExpanded) ? (
              <Link fontWeight={600} color="gray.600" fontSize="sm" onClick={() => expandComment()}>
                + {comment.childrenCount} More {comment.childrenCount === 1 ? 'Reply' : 'Replies'}
              </Link>
            ) : (
              <Box />
            )}
            <Link
              onClick={() => setReplyMode(true)}
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

        {!!commentChildren?.length && isExpanded && (
          <Flex>
            <Box
              pl={1}
              mr={1}
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
