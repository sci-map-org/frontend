import { Box, Center, CircularProgress, CircularProgressLabel, Flex, IconButton, Wrap } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useStartLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningPathCompletionDataFragment } from './LearningPathCompletion.generated';

export const LearningPathCompletionData = gql`
  fragment LearningPathCompletionData on LearningPath {
    _id
    durationMs
    started {
      startedAt
    }
    resourceItems {
      resource {
        _id
        consumed {
          openedAt
          consumedAt
        }
        durationMs
      }
    }
  }
`;

interface LearningPathCompletionProps {
  learningPath: LearningPathCompletionDataFragment;
}

// TODO find a good name. Badge / widget ? urgh
export const LearningPathCompletion: React.FC<LearningPathCompletionProps> = ({ learningPath }) => {
  const resourceItems = learningPath.resourceItems || [];
  const [startLearningPath] = useStartLearningPathMutation();
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const completedResources = useMemo(() => {
    return learningPath.resourceItems
      ? learningPath.resourceItems.filter((i) => i.resource.consumed && i.resource.consumed.consumedAt)
      : [];
  }, [resourceItems]);

  const completionRate = useMemo(() => {
    return completedResources.length / resourceItems.length;
  }, [resourceItems, completedResources]);

  return (
    <Flex direction="column" alignItems="stretch" w="200px">
      <Center>
        {learningPath.started ? (
          <CircularProgress value={completionRate * 100} color="teal.400" trackColor="gray.200" size="96px" capIsRound>
            <CircularProgressLabel color="teal.400" fontWeight={500}>
              {(completionRate * 100).toFixed(0)}%
            </CircularProgressLabel>
          </CircularProgress>
        ) : (
          <IconButton
            aria-label="start learning path"
            icon={<FaPlay />}
            colorScheme="teal"
            size="lg"
            isRound
            onClick={() => {
              if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
              startLearningPath({ variables: { learningPathId: learningPath._id } });
            }}
          />
        )}
      </Center>
      <Wrap spacing={3} mt={3} justify="center">
        {resourceItems.map((resourceItem) => (
          <Box
            key={resourceItem.resource._id}
            w={6}
            h={3}
            bgColor={resourceItem.resource.consumed?.consumedAt ? 'teal.400' : 'gray.200'}
          />
        ))}
      </Wrap>
    </Flex>
  );
};
