import { NetworkStatus } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { BestXPagesLinks } from '../../components/domains/BestXPagesLinks';
import { DomainLearningGoals } from '../../components/domains/DomainLearningGoals';
import { DomainUserHistory } from '../../components/domains/DomainUserHistory';
import { ParentDomainsNavigationBlock } from '../../components/domains/ParentDomainsNavigationBlock';
import { TopicPageLayout } from '../../components/layout/TopicPageLayout';
import { LearningGoalCardData } from '../../components/learning_goals/cards/LearningGoalCard';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathIcon } from '../../components/lib/icons/LearningPathIcon';
import { ResourceIcon } from '../../components/lib/icons/ResourceIcon';
import { PageButtonLink, PageLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedLearningMaterials } from '../../components/resources/DomainRecommendedLearningMaterials';
import { useGetDomainRecommendedLearningMaterialsQuery } from '../../components/resources/DomainRecommendedLearningMaterials.generated';
import { MapVisualisationTopicData } from '../../components/topics/SubTopicsMapVisualisation';
import { SubTopicsMenu, SubTopicsMenuData } from '../../components/topics/SubTopicsMenu';
import { SubTopicsMinimap } from '../../components/topics/SubTopicsMinimap';
import { generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, DomainLinkData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainLearningMaterialsOptions, DomainLearningMaterialsSortingType, TopicType } from '../../graphql/types';
import { routerPushToPage } from '../PageInfo';
import {
  AddResourceToDomainPageInfo,
  ConceptListPageInfo,
  ManageDomainPageInfo,
  NewLearningPathPageInfo,
} from '../RoutesPageInfos';
import { GetDomainByKeyDomainPageQuery, useGetDomainByKeyDomainPageQuery } from './DomainPage.generated';

export const getDomainByKeyDomainPage = gql`
  query getDomainByKeyDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      ...MapVisualisationTopicData
      subTopics(options: { sorting: { type: index, direction: ASC } }) {
        ...SubTopicsMenuData
      }
      parentTopics(options: { sorting: { type: index, direction: ASC } }) {
        index
        parentTopic {
          ...DomainLinkData
          ...MapVisualisationTopicData
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
  ${MapVisualisationTopicData}
  ${DomainLinkData}
  ${LearningGoalCardData}
  ${SubTopicsMenuData}
`;

const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
  ...generateDomainData(),
  topicType: TopicType.Domain,
  subTopics: [...Array(12)].map(() => ({
    subTopic: { ...generateConceptData(), topicType: TopicType.Concept },
    index: 0,
  })),
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
    // networkStatus,
    loading: resourcesLoading,
    refetch: refetchLearningMaterials,
  } = useGetDomainRecommendedLearningMaterialsQuery({
    variables: { key: domainKey, learningMaterialsOptions: learningMaterialsOptions },
    fetchPolicy: 'no-cache',
    ssr: false,
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data?.getDomainByKey.learningMaterials?.items) {
        setLearningMaterialPreviews(data?.getDomainByKey.learningMaterials?.items);
      }
    },
  });

  const learningMaterials = learningMaterialsData?.getDomainByKey?.learningMaterials?.items || learningMaterialPreviews; // ? after getDomainByKey because of https://github.com/apollographql/apollo-client/issues/6986

  const domain = data?.getDomainByKey || placeholderDomainData;

  if (error) return null;
  return (
    <TopicPageLayout
      renderTopLeftNavigation={
        <ParentDomainsNavigationBlock
          domains={
            (domain.parentTopics || [])
              .filter(({ parentTopic }) => parentTopic.__typename === 'Domain')
              .map(({ parentTopic }) => parentTopic) as DomainLinkDataFragment[] // TODO
          }
        />
      }
      renderManagementIcons={
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            size="xs"
            isDisabled={loading}
            variant="solid"
            aria-label="manage_domain"
            icon={<SettingsIcon />}
            onClick={() => routerPushToPage(ManageDomainPageInfo(domain))}
          />
        </RoleAccess>
      }
      renderTitle={
        <Heading
          fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
          fontWeight={500}
          color="blackAlpha.800"
          backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
        >
          Learn <Text as="span">{domain.name}</Text>
        </Heading>
      }
      renderBlockBelowTitle={
        <>
          <Skeleton isLoaded={!loading}>
            <PageLink
              color="gray.600"
              _hover={{ color: 'gray.700', textDecoration: 'none' }}
              fontWeight={600}
              fontSize="sm"
              pageInfo={ConceptListPageInfo(domain)}
              isDisabled={loading}
            >
              {domain.subTopics?.length ? domain.subTopics.length + ' SubTopics ' : 'No SubTopics yet'}
            </PageLink>
          </Skeleton>
          {domain && domain.description && (
            <Skeleton isLoaded={!loading}>
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
                isDisabled={loading}
              >
                Add Resource
              </PageButtonLink>
              <PageButtonLink
                leftIcon={<LearningPathIcon boxSize={7} />}
                variant="solid"
                colorScheme="teal"
                pageInfo={NewLearningPathPageInfo}
                loggedInOnly
                isDisabled={loading}
              >
                Add Learning Path
              </PageButtonLink>
            </Stack>
          </Flex>
        </>
      }
      renderMinimap={(pxWidth, pxHeight) => (
        <SubTopicsMinimap
          domainKey={domain.key}
          topic={domain}
          isLoading={!!loading || !!resourcesLoading}
          subTopics={(domain.subTopics || []).map(({ subTopic }) => subTopic)}
          parentTopics={(domain.parentTopics || []).map(({ parentTopic }) => parentTopic)}
          pxWidth={pxWidth}
          pxHeight={pxHeight}
        />
      )}
      isLoading={loading}
      topicType={TopicType.Domain}
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
            <SubTopicsMenu
              topicId={domain._id}
              domain={domain}
              minWidth="260px"
              subTopics={domain.subTopics || []}
              isLoading={loading}
              onConceptToggled={() => refetchLearningMaterials()}
            />
            <BestXPagesLinks domainKey={domain.key} />
          </Stack>
        </Flex>
      </>
    </TopicPageLayout>
  );
};
