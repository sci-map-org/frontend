import { NetworkStatus } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box, ButtonGroup, Flex, Heading, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainConceptGraph } from '../../components/concepts/DomainConceptGraph';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { DomainUserHistory } from '../../components/domains/DomainUserHistory';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningPathMiniCardData } from '../../components/learning_paths/LearningPathMiniCard';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { InternalButtonLink, InternalLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { useGetDomainRecommendedLearningMaterialsQuery } from '../../components/resources/DomainRecommendedLearningMaterials.generated';
import { ResourceMiniCardData } from '../../components/resources/ResourceMiniCard';
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
      learningMaterials(options: { sortingType: newest, filter: { completedByUser: true } }) {
        items {
          ...ResourceMiniCardData
          ...LearningPathMiniCardData
        }
      }
    }
  }
  ${DomainData}
  ${ConceptData}
  ${ResourceMiniCardData}
  ${LearningPathMiniCardData}
`;

const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
  ...generateDomainData(),
  concepts: {
    items: [...Array(12)].map(() => ({
      concept: generateConceptData(),
      relationship: {
        index: 0,
      },
    })),
  },
};

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();

  const { data, loading, error } = useGetDomainByKeyDomainPageQuery({
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

  // const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();
  if (error) return null;
  return (
    <PageLayout marginSize="md">
      <Stack direction={{ base: 'column', md: 'row' }} alignItems="stretch" pb={5} spacing={5}>
        <Flex direction="column" alignItems="flex-start" flexGrow={1}>
          <Skeleton isLoaded={!loading}>
            <Heading fontSize="4xl" fontWeight="normal" color="blackAlpha.800">
              Learn {domain.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <InternalLink
              color="gray.600"
              _hover={{ color: 'gray.700', textDecoration: 'underline' }}
              fontWeight={600}
              routePath="/domains/[key]/concepts"
              asHref={`/domains/${domain.key}/concepts`}
              isDisabled={loading}
            >
              {domain.concepts?.items.length ? domain.concepts?.items.length + ' Concepts ' : 'No concepts yet'}
            </InternalLink>
          </Skeleton>
          {domain && domain.description && (
            <Skeleton mt={2} isLoaded={!loading}>
              <Box fontWeight={250}>{domain.description}</Box>
            </Skeleton>
          )}
        </Flex>
        <Flex direction="column" alignItems={{ base: 'flex-start', md: 'flex-end' }}>
          <ButtonGroup spacing={2}>
            <InternalButtonLink
              variant="solid"
              colorScheme="blue"
              routePath="/domains/[key]/resources/new"
              asHref={router.asPath + '/resources/new'}
              loggedInOnly
              isDisabled={loading}
            >
              Add Resource
            </InternalButtonLink>
            <InternalButtonLink
              variant="outline"
              colorScheme="teal"
              // borderWidth="1px"
              routePath="/learning_paths/new"
              asHref="/resources/new"
              loggedInOnly
              isDisabled={loading}
            >
              Add Learning Path
            </InternalButtonLink>
            {/* ? would be expected to be there from the start maybe (attached + public). good to push for creation though */}
            <RoleAccess accessRule="contributorOrAdmin">
              <IconButton
                ml={2}
                isDisabled={loading}
                variant="outline"
                aria-label="manage_domain"
                icon={<SettingsIcon />}
                onClick={() => routerPushToPage(ManageDomainPageInfo(domain))}
              />
            </RoleAccess>
          </ButtonGroup>

          {/* {mockedFeaturesEnabled && (
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
        )} */}
        </Flex>
      </Stack>
      <Flex direction={{ base: 'column-reverse', md: 'row' }} mb="100px">
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
        <Stack
          spacing={4}
          alignItems={{ base: 'start', md: 'stretch' }}
          direction={{ base: 'row', md: 'column' }}
          flexShrink={0}
          ml={{ base: 0, md: 8 }}
        >
          <RoleAccess accessRule="loggedInUser">
            {domain.learningMaterials && (
              <DomainUserHistory
                maxH={{ md: '210px' }}
                domainKey={domainKey}
                learningMaterials={domain.learningMaterials.items}
              />
            )}
          </RoleAccess>
          <DomainConceptList
            minWidth="260px"
            domain={domain}
            isLoading={loading}
            onConceptToggled={() => refetchLearningMaterials()}
          />
          {/* <DomainConceptList domain={domain} isLoading={loading} onConceptToggled={() => refetchResources()} /> */}
        </Stack>
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
