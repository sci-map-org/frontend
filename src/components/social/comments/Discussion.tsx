import { Center, Flex, Heading, Spinner, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { CommentResults, DiscussionLocation } from '../../../graphql/types';
import { CommentInput } from './CommentInput';
import { CommentViewer, CommentViewerData } from './CommentViewer';
import { DiscussionDataFragment, usePostCommentMutation } from './Discussion.generated';

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
            childrenCount
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
      parent {
        _id
        children {
          _id
        }
      }
    }
  }
  ${CommentViewerData}
`;

interface DiscussionProps {
  discussionLocation: DiscussionLocation;
  discussionEntityId: string;
  commentResults?: DiscussionDataFragment;
  isLoading: boolean;
  refetch: () => void;
}

export const Discussion: React.FC<DiscussionProps> = ({
  discussionLocation,
  discussionEntityId,
  commentResults,
  refetch,
  isLoading,
}) => {
  const discussionId = useMemo(
    () => buildDiscussionId(discussionLocation, discussionEntityId),
    [discussionLocation, discussionEntityId]
  );

  const [postCommentMutation] = usePostCommentMutation();
  return (
    <Flex direction="column">
      <Heading color="gray.700" mb={10}>
        Discuss
      </Heading>
      <Stack direction="column" mx={4} alignItems="stretch">
        <Flex direction="column" alignItems="stretch" px={{ base: 2, xl: '10%' }}>
          <Heading fontSize="22px" color="gray.700" mb={2}>
            Your Message
          </Heading>
          <CommentInput
            draftLocalStorageKey={discussionId}
            post={async (content) => {
              await postCommentMutation({
                variables: {
                  payload: {
                    discussionId,
                    contentMarkdown: content,
                  },
                },
              });
              refetch();
            }}
          />
        </Flex>
        {isLoading ? (
          <Center p={12}>
            <Spinner size="lg" color="gray.600" />
          </Center>
        ) : (
          <Stack>
            {commentResults?.items.map((comment) => (
              <CommentViewer key={comment._id} discussionId={discussionId} commentId={comment._id} />
            ))}
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};
