import { NetworkStatus } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box, BoxProps, Flex, Heading, IconButton, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { BestXPagesLinks } from '../../components/domains/BestXPagesLinks';
import { DomainLearningGoals } from '../../components/domains/DomainLearningGoals';
import { DomainUserHistory } from '../../components/domains/DomainUserHistory';
import { ParentDomainsNavigationBlock } from '../../components/domains/ParentDomainsNavigationBlock';
import { BasePageLayout } from '../../components/layout/PageLayout';
import { LearningGoalCardData } from '../../components/learning_goals/cards/LearningGoalCard';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { DomainIcon } from '../../components/lib/icons/DomainIcon';
import { LearningPathIcon } from '../../components/lib/icons/LearningPathIcon';
import { ResourceIcon } from '../../components/lib/icons/ResourceIcon';
import { SubTopicsMinimap } from '../../components/topics/SubTopicsMinimap';
import { PageButtonLink, PageLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { useGetDomainRecommendedLearningMaterialsQuery } from '../../components/resources/DomainRecommendedLearningMaterials.generated';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, DomainLinkData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainLearningMaterialsOptions, DomainLearningMaterialsSortingType, TopicType } from '../../graphql/types';
import { routerPushToPage } from '../PageInfo';
import {
  AddResourceToDomainPageInfo,
  ConceptListPageInfo,
  DomainPageInfo,
  ManageDomainPageInfo,
  NewLearningPathPageInfo,
} from '../RoutesPageInfos';
import { GetDomainByKeyDomainPageQuery, useGetDomainByKeyDomainPageQuery } from './DomainPage.generated';

export const getDomainByKeyDomainPage = gql`
  query getDomainByKeyDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
        items {
          concept {
            ...ConceptData
            topicType
            size
            referencedByConcepts {
              concept {
                _id
              }
            }
            parentConcepts {
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
      parentDomains {
        domain {
          ...DomainLinkData
        }
      }
      subDomains {
        domain {
          ...DomainLinkData
          topicType
          size
        }
      }
      learningGoals {
        learningGoal {
          ...LearningGoalCardData
        }
        index
      }
    }
  }
  ${DomainData}
  ${DomainLinkData}
  ${ConceptData}
  ${LearningGoalCardData}
`;

const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
  ...generateDomainData(),
  concepts: {
    items: [...Array(12)].map(() => ({
      concept: { ...generateConceptData(), topicType: TopicType.Concept },
      relationship: {
        index: 0,
      },
    })),
  },
};

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
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

  if (error) return null;
  return (
    <BasePageLayout
      marginSize="md"
      renderHeader={(layoutProps) => (
        <DomainPageHeader
          domain={domain}
          isLoading={loading}
          resourcesLoading={resourcesLoading}
          layoutProps={layoutProps}
        />
      )}
    >
      <>
        {(loading || (domain.learningGoals && !!domain.learningGoals.length)) && (
          <DomainLearningGoals domain={domain} learningGoalItems={domain.learningGoals || []} isLoading={loading} />
        )}
        <Flex direction={{ base: 'column-reverse', md: 'row' }} mb="100px" mt={10}>
          <Flex direction="column" flexShrink={1} flexGrow={1}>
            <DomainRecommendedLearningMaterials
              domain={domain}
              learningMaterialsPreviews={learningMaterials}
              isLoading={resourcesLoading}
              reloadRecommendedResources={() => refetchLearningMaterials()}
              learningMaterialsOptions={learningMaterialsOptions}
              setLearningMaterialsOptions={setLearningMaterialsOptions}
            />
            {/* <DomainConceptGraph domain={domain} isLoading={loading} minNbRelationships={5} /> */}
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
              <DomainUserHistory maxH={{ md: '210px' }} domainKey={domainKey} />
            </RoleAccess>
            <DomainConceptList
              minWidth="260px"
              domain={domain}
              isLoading={loading}
              onConceptToggled={() => refetchLearningMaterials()}
            />
            {domain.subDomains?.length && (
              <Flex
                direction="column"
                alignItems="stretch"
                backgroundColor="gray.100"
                borderRadius={5}
                px={5}
                pt={1}
                pb={2}
              >
                <Text fontSize="xl" textAlign="center" fontWeight={600} color="gray.600" pb={2}>
                  SubAreas
                </Text>
                <Stack>
                  {(domain.subDomains || []).map(({ domain }) => (
                    <Box key={domain._id}>
                      <PageLink fontWeight={600} color="gray.700" pageInfo={DomainPageInfo(domain)}>
                        {domain.name}
                      </PageLink>
                    </Box>
                  ))}
                </Stack>
              </Flex>
            )}
            <BestXPagesLinks domainKey={domain.key} />
          </Stack>
        </Flex>
      </>
    </BasePageLayout>
  );
};

const DomainPageHeader: React.FC<{
  domain: GetDomainByKeyDomainPageQuery['getDomainByKey'];
  isLoading?: boolean;
  resourcesLoading?: boolean;
  layoutProps: BoxProps;
}> = ({ domain, layoutProps, isLoading, resourcesLoading }) => {
  return (
    <Flex
      w="100%"
      direction={{ base: 'column', lg: 'row' }}
      overflow="hidden"
      justifyContent={{ base: 'flex-start', md: 'space-between' }}
      alignItems="stretch"
      pb={4}
      {...layoutProps}
    >
      <Flex direction="column" flexGrow={1} position="relative" minH="280px" pr={{ md: '200px' }}>
        <Image
          display={{ base: 'none', md: 'initial' }}
          position="absolute"
          src="/static/tourist.svg"
          top={5}
          right={-2}
          h="280px"
          zIndex={1}
        />
        <Image
          position="absolute"
          src="/static/topostain_green_domain_page.svg"
          zIndex={0}
          top="-30%"
          right="0%"
          opacity={0.6}
          h={{ base: '300px', md: '500px' }}
        />
        <ParentDomainsNavigationBlock domains={(domain.parentDomains || []).map(({ domain }) => domain)} />

        <Stack spacing={0} pt={10} zIndex={2} alignItems="flex-start">
          <Stack direction="row" spacing={1} alignItems="center" color="gray.800" mb={1}>
            <DomainIcon boxSize="20px" mb="4px" />
            <Text fontSize="lg" fontWeight={400}>
              Area
            </Text>
          </Stack>
          <Skeleton isLoaded={!isLoading}>
            <Heading
              fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
              fontWeight={500}
              color="blackAlpha.800"
              backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
            >
              Learn <Text as="span">{domain.name}</Text>
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Stack direction="row" alignItems="baseline">
              <RoleAccess accessRule="contributorOrAdmin">
                <IconButton
                  size="xs"
                  isDisabled={isLoading}
                  variant="solid"
                  aria-label="manage_domain"
                  icon={<SettingsIcon />}
                  onClick={() => routerPushToPage(ManageDomainPageInfo(domain))}
                />
              </RoleAccess>
              <PageLink
                color="gray.600"
                _hover={{ color: 'gray.700', textDecoration: 'none' }}
                fontWeight={600}
                fontSize="sm"
                pageInfo={ConceptListPageInfo(domain)}
                isDisabled={isLoading}
              >
                {domain.concepts?.items.length ? domain.concepts?.items.length + ' SubTopics ' : 'No SubTopics yet'}
              </PageLink>
            </Stack>
          </Skeleton>
          {domain && domain.description && (
            <Skeleton isLoaded={!isLoading}>
              <Box
                mt={3}
                backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
                fontWeight={250}
              >
                {domain.description}
              </Box>
            </Skeleton>
          )}
          <Flex direction="row" w="100%">
            <Stack direction="row" spacing={4} pl={0} pt={10} pb={{ base: 4, lg: 12 }} pr={10} alignItems="flex-start">
              <PageButtonLink
                leftIcon={<ResourceIcon boxSize={8} />}
                variant="solid"
                colorScheme="blue"
                pageInfo={AddResourceToDomainPageInfo(domain)}
                loggedInOnly
                isDisabled={isLoading}
              >
                Add Resource
              </PageButtonLink>
              <PageButtonLink
                leftIcon={<LearningPathIcon boxSize={7} />}
                variant="solid"
                colorScheme="teal"
                pageInfo={NewLearningPathPageInfo}
                loggedInOnly
                isDisabled={isLoading}
              >
                Add Learning Path
              </PageButtonLink>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
      <Flex
        direction="row-reverse"
        pl={{ lg: 8 }}
        pr={0}
        pt={{ lg: 8 }}
        justifyContent={{ base: 'center', lg: 'flex-start' }}
        alignItems={{ base: 'center', lg: 'flex-start' }}
      >
        <SubTopicsMinimap
          domainKey={domain.key}
          isLoading={!!isLoading || !!resourcesLoading}
          topics={[
            ...(domain.concepts?.items.map((i) => i.concept) || []),
            ...(domain.subDomains?.map((i) => i.domain) || []),
          ]}
        />
      </Flex>
    </Flex>
  );
};
