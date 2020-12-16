import gql from 'graphql-tag';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningGoal } from '../../graphql/types';
import { PageInfo } from '../PageInfo';
import { useGetLearningGoalPageDataQuery } from './LearningGoalPage.generated';

export const LearningGoalPageInfo = (learningGoal: Pick<LearningGoal, 'key' | 'name'>): PageInfo => {
  return {
    name: learningGoal.name,
    path: '/goals/' + learningGoal.key,
    routePath: '/goals/[learningGoalKey]',
  };
};
export const getLearningGoalPageData = gql`
  query getLearningGoalPageData($learningGoalKey: String!) {
    getLearningGoalByKey(key: $learningGoalKey) {
      _id
      name
    }
  }
`;

export const LearningGoalPage: React.FC<{ learningGoalKey: string }> = ({ learningGoalKey }) => {
  const { data, loading } = useGetLearningGoalPageDataQuery({ variables: { learningGoalKey } });

  return <PageLayout title={data?.getLearningGoalByKey.name} isLoading={loading}></PageLayout>;
};
