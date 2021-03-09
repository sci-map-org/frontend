import { Flex, Heading } from '@chakra-ui/react';
import { LearningGoalCard } from '../../components/learning_goals/cards/LearningGoalCard';
import { LearningGoalCardList } from '../../components/learning_goals/cards/LearningGoalCardList';
import { PageLink } from '../../components/navigation/InternalLink';
import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { CurrentUserLearningGoalsPageInfo } from '../RoutesPageInfos';

export const HomeUserStartedGoals: React.FC<{
  startedGoals: LearningGoalLinkDataFragment[];
  isLoading?: boolean;
}> = ({ startedGoals }) => {
  return (
    <Flex direction="column" w="100%">
      <Flex direction="row" justifyContent="space-between" alignItems="baseline" mb={2}>
        <Heading size="md" color="gray.700">
          Started goals
        </Heading>
        <PageLink mx={1} pageInfo={CurrentUserLearningGoalsPageInfo} fontWeight={500}>
          See all
        </PageLink>
      </Flex>
      <LearningGoalCardList
        learningGoalItems={startedGoals.map((lg) => ({ learningGoal: lg }))}
        spacing="20px"
        renderCard={({ learningGoal }, hover) => <LearningGoalCard learningGoal={learningGoal} mouseHover={hover} />}
      />
    </Flex>
  );
};
