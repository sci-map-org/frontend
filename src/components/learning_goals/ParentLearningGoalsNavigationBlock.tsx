import { Flex, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningGoalLinkData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';
import { ParentLearningGoalsNavigationBlockDataFragment } from './ParentLearningGoalsNavigationBlock.generated';

export const ParentLearningGoalsNavigationBlockData = gql`
  fragment ParentLearningGoalsNavigationBlockData on LearningGoal {
    _id
    requiredInGoals {
      goal {
        ...LearningGoalLinkData
      }
      strength
    }
  }
  ${LearningGoalLinkData}
`;

interface ParentLearningGoalsNavigationBlockProps {
  learningGoal: ParentLearningGoalsNavigationBlockDataFragment;
}

export const ParentLearningGoalsNavigationBlock: React.FC<ParentLearningGoalsNavigationBlockProps> = ({
  learningGoal,
}) => {
  if (!learningGoal.requiredInGoals || !learningGoal.requiredInGoals.length) return null;
  return (
    <Flex direction="column">
      <Text fontWeight={600} color="gray.600" fontSize="sm">
        Featured In:
      </Text>
      <Stack direction="column" spacing={1} pl={2} ml={3} maxH="86px" overflowY="scroll" bgColor="gray.50">
        {learningGoal.requiredInGoals.map((parentGoal) => (
          <PageLink key={parentGoal.goal._id} fontSize="sm" pageInfo={LearningGoalPageInfo(parentGoal.goal)}>
            {parentGoal.goal.name}
          </PageLink>
        ))}
      </Stack>
    </Flex>
  );
};
