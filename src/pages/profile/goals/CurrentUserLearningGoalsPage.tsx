import { Center } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../../components/layout/PageLayout';
import { LearningGoalCard, LearningGoalCardData } from '../../../components/learning_goals/cards/LearningGoalCard';
import { LearningGoalCardWrapper } from '../../../components/learning_goals/cards/LearningGoalCardWrapper';
import { InternalButtonLink } from '../../../components/navigation/InternalLink';
import {
  GetCurrentUserLearningGoalsPageQuery,
  useGetCurrentUserLearningGoalsPageQuery,
} from './CurrentUserLearningGoalsPage.generated';

export const getCurrentUserLearningGoalsPage = gql`
  query getCurrentUserLearningGoalsPage {
    currentUser {
      _id
      startedLearningGoals(options: {}) {
        startedAt
        learningGoal {
          ...LearningGoalCardData
        }
      }
    }
  }
  ${LearningGoalCardData}
`;

const placeholderData: GetCurrentUserLearningGoalsPageQuery = {
  currentUser: {
    _id: '_id',
    startedLearningGoals: [],
  },
};

export const CurrentUserLearningGoalsPage: React.FC<{}> = () => {
  const { data, loading } = useGetCurrentUserLearningGoalsPageQuery();

  const { currentUser } = data || placeholderData;
  if (!currentUser && !loading) return null;

  return (
    <PageLayout title="My Learning Goals" marginSize="md" isLoading={loading} centerChildren>
      {currentUser && currentUser.startedLearningGoals && (
        <LearningGoalCardWrapper
          learningGoalItems={currentUser.startedLearningGoals}
          renderCard={({ learningGoal }, mouseHover) => (
            <LearningGoalCard learningGoal={learningGoal} mouseHover={mouseHover} />
          )}
        />
      )}

      <Center mt={6}>
        <InternalButtonLink routePath="/goals/new" asHref="/goals/new" colorScheme="blue">
          Create New Goal
        </InternalButtonLink>
        {/* <NewLearningGoalModal
              renderButton={(onClick) => (
                <Button size="lg" colorScheme="blue" onClick={onClick}>
                  Create New Goal
                </Button>
              )}
              // onCreated={(createdLearningGoal) =>
              //   startLearningGoal({ variables: { learningGoalId: createdLearningGoal._id } })
              // }
            /> */}
      </Center>
    </PageLayout>
  );
};
