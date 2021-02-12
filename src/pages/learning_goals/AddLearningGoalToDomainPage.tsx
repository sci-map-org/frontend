import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewLearningGoal } from '../../components/learning_goals/NewLearningGoal';
import { useGetDomainByKeyQuery } from '../../graphql/domains/domains.operations.generated';
import { routerPushToPage } from '../PageInfo';
import { LearningGoalPageInfo } from '../RoutesPageInfos';

export const AddLearningGoalToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetDomainByKeyQuery({ variables: { key: domainKey } });
  const domain = data?.getDomainByKey;
  if (!domain) return null;
  return (
    <PageLayout title={`Add Learning Goal to ${domain.name}`} isLoading={loading} marginSize="xl">
      <NewLearningGoal
        defaultDomain={domain}
        onCreated={(createdLearningGoal) => routerPushToPage(LearningGoalPageInfo(createdLearningGoal))}
        onCancel={() => Router.back()}
      />
    </PageLayout>
  );
};
