import { Flex, Heading } from '@chakra-ui/react';
import { LearningGoalCard } from '../../components/learning_goals/cards/LearningGoalCard';
import { LearningGoalCardList } from '../../components/learning_goals/cards/LearningGoalCardList';
import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';

export const HomeLearningGoalsRecommendations: React.FC<{
  learningGoals: LearningGoalLinkDataFragment[];
  isLoading?: boolean;
}> = ({ learningGoals }) => {
  return (
    <Flex direction="column" w="100%">
      <Flex mb={2}>
        <Heading size="md" color="gray.700">
          Trending goals
        </Heading>
      </Flex>
      <LearningGoalCardList
        learningGoalItems={learningGoals.map((lg) => ({ learningGoal: lg }))}
        spacing="20px"
        renderCard={({ learningGoal }, hover) => <LearningGoalCard learningGoal={learningGoal} mouseHover={hover} />}
      />
    </Flex>
  );
};

// const HomeLearningGoalCard: React.FC<{ learningGoal: LearningGoalLinkDataFragment }> = ({ learningGoal }) => {
//   return (
//     <PageLink pageInfo={LearningGoalPageInfo(learningGoal)} borderWidth={1} borderRadius={4} w="200px" h="140px">
//       {learningGoal.name}
//     </PageLink>
//   );
// };
