import { Center, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../../components/layout/PageLayout';
import { LearningGoalCard, LearningGoalCardData } from '../../../components/learning_goals/cards/LearningGoalCard';
import { LearningGoalCardWrapper } from '../../../components/learning_goals/cards/LearningGoalCardWrapper';
import { PageButtonLink } from '../../../components/navigation/InternalLink';
import { NewLearningGoalPageInfo } from '../../RoutesPageInfos';
import {
  GetCurrentUserLearningGoalsPageQuery,
  useGetCurrentUserLearningGoalsPageQuery,
} from './CurrentUserLearningGoalsPage.generated';

export const getCurrentUserLearningGoalsPage = gql`
  query getCurrentUserLearningGoalsPage {
    currentUser {
      _id
      # startedLearningGoals(options: {}) {
      #   startedAt
      #   learningGoal {
      #     ...LearningGoalCardData
      #   }
      # }
      # createdLearningGoals(options: {}) {
      #   createdAt
      #   learningGoal {
      #     ...LearningGoalCardData
      #   }
      # }
    }
  }
`;

const placeholderData: GetCurrentUserLearningGoalsPageQuery = {
  currentUser: {
    _id: '_id',
    // startedLearningGoals: [],
  },
};

export const CurrentUserLearningGoalsPage: React.FC<{}> = () => {
  const { data, loading } = useGetCurrentUserLearningGoalsPageQuery();

  const { currentUser } = data || placeholderData;
  if (!currentUser && !loading) return null;

  return (
    <PageLayout title="My Learning Goals" marginSize="md" isLoading={loading} centerChildren>
      <Text fontSize="3xl" mt={5}>
        Started Goals
      </Text>

      {/* {currentUser && currentUser.startedLearningGoals && (
        <LearningGoalCardWrapper
          learningGoalItems={currentUser.startedLearningGoals}
          renderCard={({ learningGoal }, mouseHover) => (
            <LearningGoalCard learningGoal={learningGoal} mouseHover={mouseHover} />
          )}
        />
      )} */}

      <Text fontSize="3xl" mt={12} color="gray.700">
        Created Goals
      </Text>

      {/* {currentUser && currentUser.createdLearningGoals && (
        <LearningGoalCardWrapper
          learningGoalItems={currentUser.createdLearningGoals}
          renderCard={({ learningGoal }, mouseHover) => (
            <LearningGoalCard learningGoal={learningGoal} mouseHover={mouseHover} />
          )}
        />
      )} */}

      <Center mt={6}>
        <PageButtonLink pageInfo={NewLearningGoalPageInfo} colorScheme="blue">
          Create New Goal
        </PageButtonLink>
      </Center>
    </PageLayout>
  );
};
