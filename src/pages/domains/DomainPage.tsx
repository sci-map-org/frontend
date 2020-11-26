import { NetworkStatus } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Skeleton } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainConceptGraph } from '../../components/concepts/DomainConceptGraph';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { InternalButtonLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { useGetDomainRecommendedLearningMaterialsQuery } from '../../components/resources/DomainRecommendedLearningMaterials.generated';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainLearningMaterialsOptions, DomainLearningMaterialsSortingType } from '../../graphql/types';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { PageInfo, routerPushToPage } from '../PageInfo';
import { GetDomainByKeyDomainPageQuery, useGetDomainByKeyDomainPageQuery } from './DomainPage.generated';
import { ManageDomainPageInfo } from './ManageDomainPage';

export const DomainPagePath = (domainKey: string) => `/domains/${domainKey}`;

export const DomainPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: domain.name,
  path: DomainPagePath(domain.key),
  routePath: DomainPagePath('[key]'),
});

export const getDomainByKeyDomainPage = gql`
  query getDomainByKeyDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
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
  ${DomainData}
  ${ConceptData}
`;

const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
  ...generateDomainData(),
  concepts: {
    items: [
      {
        concept: generateConceptData(),
        relationship: {
          index: 0,
        },
      },
      {
        concept: generateConceptData(),
        relationship: {
          index: 0,
        },
      },
    ],
  },
};

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();

  const { data, loading } = useGetDomainByKeyDomainPageQuery({
    variables: { key: domainKey },
  });

  const [learningMaterialsOptions, setLearningMaterialsOptions] = useState<DomainLearningMaterialsOptions>({
    sortingType: DomainLearningMaterialsSortingType.Recommended,
    filter: { completedByUser: false },
  });
  const [learningMaterialPreviews, setLearningMaterialPreviews] = useState<
    (ResourcePreviewDataFragment | LearningPathPreviewCardDataFragment)[]
  >([]);

  const {
    data: learningMaterialsData,
    networkStatus,
    refetch: refetchLearningMaterials,
  } = useGetDomainRecommendedLearningMaterialsQuery({
    variables: { key: domainKey, learningMaterialsOptions: learningMaterialsOptions },
    fetchPolicy: 'network-only',
    ssr: false,
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data?.getDomainByKey.learningMaterials?.items) {
        setLearningMaterialPreviews(data?.getDomainByKey.learningMaterials?.items);
      }
    },
  });
  const [resourcesLoading, setResourcesLoading] = useState(networkStatus === NetworkStatus.loading);

  useEffect(() => {
    setResourcesLoading(
      [NetworkStatus.refetch, NetworkStatus.setVariables, NetworkStatus.loading, NetworkStatus].indexOf(networkStatus) >
        -1
    );
  }, [networkStatus]);

  const learningMaterials = learningMaterialsData?.getDomainByKey?.learningMaterials?.items || learningMaterialPreviews; // ? after getDomainByKey because of https://github.com/apollographql/apollo-client/issues/6986

  const domain = data?.getDomainByKey || placeholderDomainData;

  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();

  return (
    <PageLayout marginSize="sm">
      <Flex direction="row" alignItems="center" pb={5}>
        <Skeleton isLoaded={!loading}>
          <Heading fontSize="4xl" fontWeight="normal" color="blackAlpha.800">
            Learn {domain.name}
          </Heading>
        </Skeleton>
        <Box flexGrow={1} />
        <InternalButtonLink
          variant="outline"
          borderColor="blue.500"
          color="blue.700"
          borderWidth="1px"
          routePath="/domains/[key]/resources/new"
          asHref={router.asPath + '/resources/new'}
          loggedInOnly
          isDisabled={loading}
        >
          + Add resource
        </InternalButtonLink>
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            ml={2}
            variant="outline"
            aria-label="manage_domain"
            icon={<SettingsIcon />}
            onClick={() => routerPushToPage(ManageDomainPageInfo(domain))}
          />
        </RoleAccess>
        {mockedFeaturesEnabled && (
          <Box ml={2}>
            <InternalButtonLink
              routePath="/domains/[key]/resources/indexing_queue"
              asHref={router.asPath + '/resources/indexing_queue'}
              variant="solid"
              fontStyle="italic"
            >
              32 Pending Resources
            </InternalButtonLink>
          </Box>
        )}
      </Flex>
      {domain && domain.description && (
        <Box mb={2} fontWeight={250}>
          {domain.description}
        </Box>
      )}
      <Flex direction={{ base: 'column-reverse', md: 'row' }} mb="100px">
        <Flex direction="column" flexShrink={0} minWidth="260px">
          <DomainConceptList domain={domain} isLoading={loading} onConceptToggled={() => refetchLearningMaterials()} />
        </Flex>

        <Flex direction="column" flexShrink={1} flexGrow={1}>
          <DomainRecommendedLearningMaterials
            domainKey={domainKey}
            learningMaterialsPreviews={learningMaterials}
            isLoading={resourcesLoading}
            reloadRecommendedResources={() => refetchLearningMaterials()}
            learningMaterialsOptions={learningMaterialsOptions}
            setLearningMaterialsOptions={setLearningMaterialsOptions}
          />
          <DomainConceptGraph domain={domain} isLoading={loading} minNbRelationships={5} />
          {/* <DomainLearningPaths domain={domain} /> */}
          {/* {mockedFeaturesEnabled && <DomainLearningPaths domain={domain} />} */}
        </Flex>
        {/* )} */}
        {/* {mockedFeaturesEnabled && (
          <Stack spacing={4} direction="column" ml={6} flexShrink={1}>
            <Box>
              <Text fontSize="2xl">Sub domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Elixir' },
                  { _id: 2, name: 'Clojure' },
                  { _id: 3, name: 'Haskell' },
                  { _id: 4, name: 'JavaScript Functional Programming' },
                ].map((domain) => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Related domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Category Theory' },
                  { _id: 2, name: 'Object Oriented Programming' },
                ].map((domain) => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Links</Text>
              <Stack direction="column"></Stack>
            </Box>
          </Stack>
        )} */}
      </Flex>
    </PageLayout>
  );
};
