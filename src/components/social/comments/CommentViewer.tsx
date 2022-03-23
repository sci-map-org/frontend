import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { format } from 'timeago.js';
import { UserProfilePageInfo } from '../../../pages/RoutesPageInfos';
import { UserKeyLinkStyleProps } from '../../lib/Typography';
import { PageLink } from '../../navigation/InternalLink';
import { UserAvatar, UserAvatarData } from '../../users/UserAvatar';
import { CommentInput } from './CommentInput';
import { CommentViewerDataFragment } from './CommentViewer.generated';
import { usePostCommentMutation } from './Discussion.generated';

export const CommentViewerData = gql`
  fragment CommentViewerData on Comment {
    _id
    contentMarkdown
    postedAt
    postedBy {
      ...UserAvatarData
    }
  }
  ${UserAvatarData}
`;

interface CommentViewerProps {
  discussionId: string;
  comment: CommentViewerDataFragment & { children?: CommentViewerDataFragment[] | null };
}

export const CommentViewer: React.FC<CommentViewerProps> = ({ discussionId, comment }) => {
  const [replyMode, setReplyMode] = useState(false);
  const [postCommentMutation] = usePostCommentMutation();

  if (!comment.postedBy) {
    console.error(`No postedBy for comment ${comment._id} - should never happen`);
    return null;
  }
  return (
    <Flex direction="column" alignItems="stretch">
      <Flex direction="row" alignItems="stretch">
        <Flex justifyContent="center" w={16}>
          <UserAvatar user={comment.postedBy} />
        </Flex>
        <Flex direction="column" flexGrow={1}>
          <Stack direction="row" alignItems="baseline" spacing={1}>
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
          <Text bgColor="gray.50" pt={1} pb={2} px={4} borderRadius={6} color="gray.700">
            {comment.contentMarkdown}
          </Text>
          {replyMode ? (
            <Flex direction="column" alignItems="stretch">
              {/* <Heading size="md">Your reply</Heading> */}
              <CommentInput
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
                  // onCommentPosted?.();
                }}
              />
            </Flex>
          ) : (
            <Flex justifyContent="flex-end" h={8} alignItems="center">
              <Link
                onClick={() => setReplyMode(true)}
                variant="ghost"
                color="blue.600"
                fontWeight={600}
                _hover={{ color: 'blue.500' }}
              >
                Reply
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
      {!!comment.children?.length && (
        <Flex>
          <Box ml={16} borderRightWidth={2} borderColor="gray.400" mb={8} />
          <Stack flexGrow={1}>
            {comment.children.map((child) => (
              <CommentViewer discussionId={discussionId} comment={child} />
            ))}
          </Stack>
        </Flex>
      )}
    </Flex>
  );
};
