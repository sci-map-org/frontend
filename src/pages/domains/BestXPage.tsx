import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { BestXPagesLinks } from '../../components/domains/BestXPagesLinks';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningPathPreviewCardData } from '../../components/learning_paths/LearningPathPreviewCard';
import { InternalButtonLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import {
  DomainLearningMaterialsOptions,
  DomainLearningMaterialsSortingType,
  LearningMaterialType,
  ResourceType,
} from '../../graphql/types';
import { GetBestXPageDataQuery, useGetBestXPageDataQuery } from './BestXPage.generated';
import { DomainPageInfo } from './DomainPage';

export const getBestXPageData = gql`
  query getBestXPageData($key: String!, $learningMaterialsOptions: DomainLearningMaterialsOptions!) {
    getDomainByKey(key: $key) {
      _id
      key
      name
      description
      learningMaterials(options: $learningMaterialsOptions) {
        items {
          ...ResourcePreviewData
          ...LearningPathPreviewCardData
        }
      }
      concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
        items {
          concept {
            ...ConceptData
            referencedByConcepts {
              concept {
                _id
              }
            }
            subConcepts {
              concept {
                _id
              }
            }
          }
          relationship {
            index
          }
        }
      }
    }
  }
  ${ResourcePreviewData}
  ${ConceptData}
  ${LearningPathPreviewCardData}
`;

export const BestXPage: React.FC<{ domainKey: string; x: ResourceType[] }> = ({ domainKey, x }) => {
  const [learningMaterialsOptions, setLearningMaterialsOptions] = useState<DomainLearningMaterialsOptions>({
    sortingType: DomainLearningMaterialsSortingType.Rating,
    filter: { completedByUser: false, resourceTypeIn: x, learningMaterialTypeIn: [LearningMaterialType.Resource] },
  });

  const [domainData, setDomainData] = useState<GetBestXPageDataQuery['getDomainByKey']>();
  const { data, loading, refetch: refetchLearningMaterials } = useGetBestXPageDataQuery({
    variables: { key: domainKey, learningMaterialsOptions: learningMaterialsOptions },
    onCompleted(data) {
      setDomainData(data.getDomainByKey);
    },
  });

  const domain = data?.getDomainByKey || domainData;
  if (!domain) return null;

  return (
    <PageLayout marginSize="md" breadCrumbsLinks={[DomainPageInfo(domain)]}>
      <Flex direction="row" w="100%" justifyContent="stretch">
        <Flex direction="column" flexGrow={1}>
          <Heading fontSize="4xl" fontWeight="normal" color="blackAlpha.800">
            Learn {domain.name}
          </Heading>
          {domain && domain.description && <Box fontWeight={250}>{domain.description}</Box>}
        </Flex>
        <Flex direction="row" justifyContent="flex-end" alignItems="center">
          <InternalButtonLink
            variant="solid"
            colorScheme="blue"
            routePath="/domains/[key]/resources/new"
            asHref={`/domains/${domain.key}/resources/new`}
            loggedInOnly
          >
            Add Resource
          </InternalButtonLink>
        </Flex>
      </Flex>
      <Box my={8} />
      <Flex direction="row">
        <Flex flexGrow={1}>
          <DomainRecommendedLearningMaterials
            title={`Best X about ${domain.name}`}
            domainKey={domainKey}
            learningMaterialsPreviews={domain.learningMaterials?.items || []}
            isLoading={loading}
            reloadRecommendedResources={() => refetchLearningMaterials()}
            learningMaterialsOptions={learningMaterialsOptions}
            setLearningMaterialsOptions={setLearningMaterialsOptions}
          />
        </Flex>
        <Stack direction="column">
          <DomainConceptList minWidth="260px" domain={domain} />
          <BestXPagesLinks domainKey={domain.key} />
        </Stack>
      </Flex>
    </PageLayout>
  );
};
