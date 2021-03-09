import { Flex, Stack, Text } from '@chakra-ui/react';
import { LearningGoalBelongsToDomain } from '../../graphql/types';
import { LearningGoalCard } from '../learning_goals/cards/LearningGoalCard';
import { LearningGoalCardDataFragment } from '../learning_goals/cards/LearningGoalCard.generated';
import { LearningGoalCardList } from '../learning_goals/cards/LearningGoalCardList';
import { LearningGoalIcon } from '../lib/icons/LearningGoalIcon';

interface DomainLearningGoalsProps {
  learningGoalItems: Array<
    Pick<LearningGoalBelongsToDomain, 'index'> & {
      learningGoal: LearningGoalCardDataFragment;
    }
  >;
}
export const DomainLearningGoals: React.FC<DomainLearningGoalsProps> = ({ learningGoalItems }) => {
  return (
    <Flex direction="column" pb={5}>
      <Stack direction="row" alignItems="center" mb={2}>
        <LearningGoalIcon boxSize="22px" />
        <Text fontSize="2xl">Learning Goals</Text>
      </Stack>

      <LearningGoalCardList
        learningGoalItems={learningGoalItems}
        spacing="20px"
        renderCard={({ learningGoal }, hover) => <LearningGoalCard learningGoal={learningGoal} mouseHover={hover} />}
      />
    </Flex>
  );
};
