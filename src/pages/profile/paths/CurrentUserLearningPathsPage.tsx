import { Center, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../../components/layout/PageLayout';
import { LearningPathPreviewCardData } from '../../../components/learning_paths/LearningPathPreviewCard';
import { LearningPathPreviewCardList } from '../../../components/learning_paths/LearningPathPreviewCardList';
import { PageButtonLink } from '../../../components/navigation/InternalLink';
import { NewLearningPathPageInfo } from '../../RoutesPageInfos';
import {
  GetCurrentUserLearningPathsPageQuery,
  useGetCurrentUserLearningPathsPageQuery,
} from './CurrentUserLearningPathsPage.generated';

export const getCurrentUserLearningPathsPage = gql`
  query getCurrentUserLearningPathsPage {
    currentUser {
      _id
      startedLearningPaths(options: {}) {
        startedAt
        learningPath {
          ...LearningPathPreviewCardData
        }
      }
      createdLearningPaths(options: {}) {
        ...LearningPathPreviewCardData
      }
    }
  }
  ${LearningPathPreviewCardData}
`;

const placeholderData: GetCurrentUserLearningPathsPageQuery = {
  currentUser: {
    _id: '_id',
    startedLearningPaths: [],
  },
};

export const CurrentUserLearningPathsPage: React.FC<{}> = () => {
  const { data, loading } = useGetCurrentUserLearningPathsPageQuery();

  const { currentUser } = data || placeholderData;
  if (!currentUser && !loading) return null;

  return (
    <PageLayout title="My Learning Paths" marginSize="md" isLoading={loading} centerChildren>
      <Text fontSize="3xl" mt={5}>
        Started Paths
      </Text>

      {currentUser && currentUser.startedLearningPaths && (
        <LearningPathPreviewCardList
          learningPaths={currentUser.startedLearningPaths.map(({ learningPath }) => learningPath)}
        />
        // <LearningGoalCardWrapper
        //   learningGoalItems={currentUser.startedLearningPaths}
        //   renderCard={({ learningGoal }, mouseHover) => (
        //     <LearningGoalCard learningGoal={learningGoal} mouseHover={mouseHover} />
        //   )}
        // />
      )}

      <Text fontSize="3xl" mt={12} color="gray.700">
        Created Paths
      </Text>

      {currentUser && currentUser.createdLearningPaths && (
        <LearningPathPreviewCardList learningPaths={currentUser.createdLearningPaths} />
      )}

      <Center mt={6}>
        <PageButtonLink pageInfo={NewLearningPathPageInfo} colorScheme="blue">
          Create New Path
        </PageButtonLink>
      </Center>
    </PageLayout>
  );
};
