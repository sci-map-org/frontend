import gql from 'graphql-tag';
import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningPathPreviewCardData } from '../../components/learning_paths/LearningPathPreviewCard';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import {
  DomainLearningMaterialsOptions,
  DomainLearningMaterialsSortingType,
  LearningMaterialType,
  ResourceType,
} from '../../graphql/types';
import { useGetBestXPageDataQuery } from './BestXPage.generated';
import { DomainPageInfo } from './DomainPage';

export const getBestXPageData = gql`
  query getBestXPageData($key: String!, $learningMaterialsOptions: DomainLearningMaterialsOptions!) {
    getDomainByKey(key: $key) {
      _id
      key
      name
      learningMaterials(options: $learningMaterialsOptions) {
        items {
          ...ResourcePreviewData
          ...LearningPathPreviewCardData
        }
      }
    }
  }
  ${ResourcePreviewData}
  ${LearningPathPreviewCardData}
`;

export const BestXPage: React.FC<{ domainKey: string; x: ResourceType[] }> = ({ domainKey, x }) => {
  const [learningMaterialsOptions, setLearningMaterialsOptions] = useState<DomainLearningMaterialsOptions>({
    sortingType: DomainLearningMaterialsSortingType.Rating,
    filter: { completedByUser: false, resourceTypeIn: x, learningMaterialTypeIn: [LearningMaterialType.Resource] },
  });

  const { data, loading, refetch: refetchLearningMaterials } = useGetBestXPageDataQuery({
    variables: { key: domainKey, learningMaterialsOptions: learningMaterialsOptions },
  });

  const domain = data?.getDomainByKey;
  if (!domain) return null;

  return (
    <PageLayout marginSize="md" breadCrumbsLinks={[DomainPageInfo(domain)]}>
      <DomainRecommendedLearningMaterials
        title={`Best X about ${domain.name}`}
        domainKey={domainKey}
        learningMaterialsPreviews={domain.learningMaterials?.items || []}
        isLoading={loading}
        reloadRecommendedResources={() => refetchLearningMaterials()}
        learningMaterialsOptions={learningMaterialsOptions}
        setLearningMaterialsOptions={setLearningMaterialsOptions}
      />
    </PageLayout>
  );
};
