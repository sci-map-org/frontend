import { Flex, Heading, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { CommentResults, DiscussionLocation } from '../../../graphql/types';
import { CommentInput } from './CommentInput';
import { CommentViewer, CommentViewerData } from './CommentViewer';
import { usePostCommentMutation } from './Discussion.generated';

export const DiscussionData = gql`
  fragment DiscussionData on CommentResults {
    items {
      ...CommentViewerData
      children {
        ...CommentViewerData
        children {
          ...CommentViewerData
          children {
            ...CommentViewerData
          }
        }
      }
    }
    totalCount
  }
  ${CommentViewerData}
`;

function buildDiscussionId(discussionLocation: DiscussionLocation, entityId: string) {
  return `${discussionLocation}:${entityId}`;
}

export const postComment = gql`
  mutation postComment($payload: PostCommentPayload!) {
    postComment(payload: $payload) {
      ...CommentViewerData
    }
  }
  ${CommentViewerData}
`;

interface DiscussionProps {
  discussionLocation: DiscussionLocation;
  discussionEntityId: string;
  commentResults?: CommentResults;
  onCommentPosted?: () => void;
  isLoading: boolean;
}

export const Discussion: React.FC<DiscussionProps> = ({
  discussionLocation,
  discussionEntityId,
  commentResults,
  onCommentPosted,
  isLoading,
}) => {
  const discussionId = useMemo(
    () => buildDiscussionId(discussionLocation, discussionEntityId),
    [discussionLocation, discussionEntityId]
  );

  const [postCommentMutation] = usePostCommentMutation();
  return (
    <Flex direction="column">
      <Heading color="gray.700" mb={6}>
        Discuss
      </Heading>
      <Stack direction="column" ml={10} alignItems="stretch">
        {/* <Flex py={12} justifyContent="stretch"> */}
        <Flex direction="column" alignItems="stretch" px={12}>
          <CommentInput
            post={async (content) => {
              await postCommentMutation({
                variables: {
                  payload: {
                    discussionId,
                    contentMarkdown: content,
                  },
                },
              });
              onCommentPosted?.();
            }}
          />
        </Flex>
        <Stack>
          {commentResults?.items.map((comment) => (
            <CommentViewer discussionId={discussionId} comment={comment} />
          ))}
        </Stack>
      </Stack>
    </Flex>
  );
};
