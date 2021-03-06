import { Flex, Heading, Stack } from '@chakra-ui/react';
import { LearningGoalCard } from '../../components/learning_goals/cards/LearningGoalCard';
import { LearningGoalCardWrapper } from '../../components/learning_goals/cards/LearningGoalCardWrapper';
import { LearningGoalIcon } from '../../components/lib/icons/LearningGoalIcon';
import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';

export const HomeLearningGoalsRecommendations: React.FC<{
  learningGoals: LearningGoalLinkDataFragment[];
}> = ({ learningGoals }) => {
  return (
    <Flex direction="column" w="100%">
      <Stack mb={3} direction="row" alignItems="stretch">
        <LearningGoalIcon boxSize="33px" />
        <Heading size="lg" color="gray.700">
          Trending goals
        </Heading>
      </Stack>
      <LearningGoalCardWrapper
        learningGoalItems={learningGoals.map((lg) => ({ learningGoal: lg }))}
        spacing="20px"
        renderCard={({ learningGoal }, hover) => <LearningGoalCard learningGoal={learningGoal} mouseHover={hover} />}
        nbItemsResponsiveMapping={{
          base: 2,
          sm: 3,
          md: 3,
          lg: 2,
          xl: 2,
        }}
      />
    </Flex>
  );
};
