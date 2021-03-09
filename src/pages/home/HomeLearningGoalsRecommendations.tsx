import { Flex, Stack } from '@chakra-ui/react';
import { PageLink } from '../../components/navigation/InternalLink';
import { LearningGoalPageInfo } from '../RoutesPageInfos';
import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';

const recommendedLearningGoals: LearningGoalLinkDataFragment[] = [];

export const HomeLearningGoalsRecommendations: React.FC<{}> = () => {
  return (
    <Flex direction="column">
      <Stack direction="row" overflowX="scroll">
        {recommendedLearningGoals.map((learningGoal) => (
          <HomeLearningGoalCard key={learningGoal._id} learningGoal={learningGoal} />
        ))}
      </Stack>
    </Flex>
  );
};

const HomeLearningGoalCard: React.FC<{ learningGoal: LearningGoalLinkDataFragment }> = ({ learningGoal }) => {
  return (
    <PageLink pageInfo={LearningGoalPageInfo(learningGoal)} borderWidth={1} borderRadius={4} w="200px" h="140px">
      {learningGoal.name}
    </PageLink>
  );
};
