import { Flex, Stack, Box, Center, Button } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../../components/layout/PageLayout';
import { InternalButtonLink, PageLink } from '../../../components/navigation/InternalLink';
import { LearningGoalPageInfo } from '../../RoutesPageInfos';
import {
  GetCurrentUserLearningGoalsPageQuery,
  useGetCurrentUserLearningGoalsPageQuery,
} from './CurrentUserLearningGoalsPage.generated';
import { NewLearningGoalModal } from '../../../components/learning_goals/NewLearningGoal';
import { useStartLearningGoalMutation } from '../../../graphql/learning_goals/learning_goals.operations.generated';

export const getCurrentUserLearningGoalsPage = gql`
  query getCurrentUserLearningGoalsPage {
    currentUser {
      _id
      startedLearningGoals(options: {}) {
        startedAt
        learningGoal {
          _id
          name
          key
        }
      }
    }
  }
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
  const [startLearningGoal] = useStartLearningGoalMutation();
  if (!currentUser && !loading) return null;

  return (
    <PageLayout title="My Learning Goals" marginSize="md" isLoading={loading} centerChildren>
      {currentUser && (
        <Stack spacing={2} minW="50%" maxW="800px">
          {currentUser.startedLearningGoals?.map(({ learningGoal, startedAt }) => (
            <Flex
              key={learningGoal._id}
              direction="column"
              alignItems="stretch"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius={3}
            >
              <Box px={2} pt={1} pb={1}>
                <PageLink pageInfo={LearningGoalPageInfo(learningGoal)} fontWeight={500}>
                  {learningGoal.name}
                </PageLink>
              </Box>
              <Flex direction="row"></Flex>
            </Flex>
          ))}
          <Center>
            <InternalButtonLink routePath="/goals/new" asHref="/goals/new">
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
        </Stack>
      )}
    </PageLayout>
  );
};
