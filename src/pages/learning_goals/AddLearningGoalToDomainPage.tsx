import { PageLayout } from '../../components/layout/PageLayout';
import { AddLearningGoalToDomain } from '../../components/learning_goals/AddLearningGoalToDomain';
import { useGetDomainByKeyQuery } from '../../graphql/domains/domains.operations.generated';

export const AddLearningGoalToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetDomainByKeyQuery({ variables: { key: domainKey } });
  const domain = data?.getDomainByKey;
  if (!domain) return null;
  return (
    <PageLayout title={`Add Learning Goal to ${domain.name}`} isLoading={loading} mode="form">
      <AddLearningGoalToDomain domain={domain} />
    </PageLayout>
  );
};
