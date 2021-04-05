import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { SubTopicsMenu } from '../../components/topics/SubTopicsMenu';
import { BestXPagesLinks } from '../../components/domains/BestXPagesLinks';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningPathPreviewCardData } from '../../components/learning_paths/LearningPathPreviewCard';
import { PageButtonLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import {
  DomainLearningMaterialsOptions,
  DomainLearningMaterialsSortingType,
  LearningMaterialType,
  ResourceType,
} from '../../graphql/types';
import { AddResourceToDomainPageInfo, DomainPageInfo } from '../RoutesPageInfos';
import { GetBestXPageDataQuery, useGetBestXPageDataQuery } from './BestXPage.generated';

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
            topicType
            referencedByConcepts {
              concept {
                _id
              }
            }
            # subConcepts {
            #   concept {
            #     _id
            #   }
            # }
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
          <PageButtonLink
            variant="solid"
            colorScheme="blue"
            pageInfo={AddResourceToDomainPageInfo(domain)}
            loggedInOnly
          >
            Add Resource
          </PageButtonLink>
        </Flex>
      </Flex>
      <Box my={8} />
      <Stack spacing={10} direction="row">
        <Flex flexGrow={1}>
          <DomainRecommendedLearningMaterials
            domain={domain}
            learningMaterialsPreviews={domain.learningMaterials?.items || []}
            isLoading={loading}
            reloadRecommendedResources={() => refetchLearningMaterials()}
            learningMaterialsOptions={learningMaterialsOptions}
            setLearningMaterialsOptions={setLearningMaterialsOptions}
          />
        </Flex>
        <Stack spacing={5} direction="column">
          <SubTopicsMenu minWidth="260px" domain={domain} />
          <BestXPagesLinks domainKey={domain.key} />
        </Stack>
      </Stack>
    </PageLayout>
  );
};
