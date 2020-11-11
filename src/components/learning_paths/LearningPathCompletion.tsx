import { Box, Center, CircularProgress, CircularProgressLabel, Flex, Wrap } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { LearningPathCompletionFragmentFragment } from './LearningPathCompletion.generated';

export const LearningPathCompletionFragment = gql`
  fragment LearningPathCompletionFragment on LearningPath {
    _id
    durationMs
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
  learningPath: LearningPathCompletionFragmentFragment;
}

// TODO find a good name. Badge / widget ? urgh
export const LearningPathCompletion: React.FC<LearningPathCompletionProps> = ({ learningPath }) => {
  const resourceItems = learningPath.resourceItems || [];

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
        <CircularProgress value={completionRate * 100} color="teal.400" trackColor="gray.200" size="96px" capIsRound>
          <CircularProgressLabel color="teal.400" fontWeight={500}>
            {(completionRate * 100).toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
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
