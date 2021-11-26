import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Skeleton, Stack, Text, Button } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { BestXPagesLinks } from '../../components/topics/BestXPagesLinks';
import { TopicPageLayout } from '../../components/layout/TopicPageLayout';
import { LearningGoalCardData } from '../../components/learning_goals/cards/LearningGoalCard';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathIcon } from '../../components/lib/icons/LearningPathIcon';
import { PageButtonLink } from '../../components/navigation/InternalLink';
import { MapVisualisationTopicData } from '../../components/topics/SubTopicsMapVisualisation';
import { TopicRecommendedLearningMaterials } from '../../components/topics/TopicRecommendedLearningMaterials';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLearningMaterialsOptions, TopicLearningMaterialsSortingType } from '../../graphql/types';
import { routerPushToPage } from '../PageInfo';
import { ManageTopicPageInfo, NewLearningPathPageInfo, NewResourcePageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyTopicPageQuery, useGetTopicByKeyTopicPageQuery } from './TopicPage.generated';
import { ResourcePreviewCardDataFragment } from '../../components/resources/ResourcePreviewCard.generated';
import { useGetTopicRecommendedLearningMaterialsQuery } from '../../components/topics/TopicRecommendedLearningMaterials.generated';
import { SubTopicsMinimap } from '../../components/topics/SubTopicsMinimap';
import { ParentTopicsBreadcrumbs, ParentTopicsBreadcrumbsData } from '../../components/topics/ParentTopicsBreadcrumbs';
import { ResourceIcon } from '../../components/lib/icons/ResourceIcon';
import { NewTopicModal } from '../../components/topics/NewTopic';

export const getTopicByKeyTopicPage = gql`
  query getTopicByKeyTopicPage($key: String!) {
    getTopicByKey(topicKey: $key) {
      _id
      name
      description
      ...MapVisualisationTopicData
      subTopics {
        subTopic {
          ...MapVisualisationTopicData
        }
      }
      ...ParentTopicsBreadcrumbsData
    }
  }
  ${MapVisualisationTopicData}
  ${TopicLinkData}
  ${ParentTopicsBreadcrumbsData}
`;

const placeholderTopicData: GetTopicByKeyTopicPageQuery['getTopicByKey'] = {
  ...generateTopicData(),
};

export const TopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const { data, loading, error, refetch } = useGetTopicByKeyTopicPageQuery({
    variables: { key: topicKey },
  });

  const [learningMaterialsOptions, setLearningMaterialsOptions] = useState<TopicLearningMaterialsOptions>({
    sortingType: TopicLearningMaterialsSortingType.Recommended,
    filter: { completedByUser: false },
  });

  const [learningMaterialPreviews, setLearningMaterialPreviews] = useState<
    (ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment)[]
  >([]);

  const {
    data: learningMaterialsData,
    // networkStatus,
    loading: resourcesLoading,
    refetch: refetchLearningMaterials,
  } = useGetTopicRecommendedLearningMaterialsQuery({
    variables: { key: topicKey, learningMaterialsOptions: learningMaterialsOptions },
    fetchPolicy: 'no-cache',
    ssr: false,
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data?.getTopicByKey.learningMaterials?.items) {
        setLearningMaterialPreviews(data?.getTopicByKey.learningMaterials?.items);
      }
    },
  });

  const learningMaterials = learningMaterialsData?.getTopicByKey?.learningMaterials?.items || learningMaterialPreviews; // ? after getDomainByKey because of https://github.com/apollographql/apollo-client/issues/6986

  const topic = data?.getTopicByKey || placeholderTopicData;

  if (error) return null;
  return (
    <TopicPageLayout
      renderTopLeftNavigation={<ParentTopicsBreadcrumbs topic={topic} isLoading={loading} />}
      renderManagementIcons={
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            size="xs"
            isDisabled={loading}
            variant="solid"
            aria-label="manage_topic"
            icon={<SettingsIcon />}
            onClick={() => routerPushToPage(ManageTopicPageInfo(topic))}
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
          Learn <Text as="span">{topic.name}</Text>
        </Heading>
      }
      renderBlockBelowTitle={
        <>
          {/* TODO topic tree page */}
          {/* <Skeleton isLoaded={!loading}>
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
          </Skeleton> */}
          {topic && topic.description && (
            <Skeleton isLoaded={!loading}>
              <Box
                mt={3}
                backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
                fontWeight={250}
              >
                {topic.description}
              </Box>
            </Skeleton>
          )}
          <Flex direction="row" w="100%">
            <Stack direction="row" spacing={4} pl={0} pt={10} pb={{ base: 4, lg: 12 }} pr={10} alignItems="flex-start">
              <PageButtonLink
                leftIcon={<ResourceIcon boxSize={8} />}
                variant="solid"
                colorScheme="blue"
                pageInfo={NewResourcePageInfo}
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
              <RoleAccess accessRule="loggedInUser">
                <NewTopicModal
                  parentTopic={topic}
                  renderButton={(openModal) => (
                    <Button variant="solid" colorScheme="blue" isDisabled={loading} onClick={openModal}>
                      Add SubTopic
                    </Button>
                  )}
                  onCreated={() => refetch()}
                />
              </RoleAccess>
            </Stack>
          </Flex>
        </>
      }
      renderMinimap={(pxWidth, pxHeight) => (
        <SubTopicsMinimap
          topic={topic}
          isLoading={!!loading || !!resourcesLoading}
          subTopics={(topic.subTopics || []).map(({ subTopic }) => subTopic)}
          parentTopic={topic.parentTopic || undefined}
          pxWidth={pxWidth}
          pxHeight={pxHeight}
        />
      )}
      isLoading={loading}
    >
      <>
        {/* {(loading || (topic.learningGoals && !!domain.learningGoals.length)) && (
          <DomainLearningGoals domain={domain} learningGoalItems={domain.learningGoals || []} isLoading={loading} />
        )} */}
        <Flex direction={{ base: 'column-reverse', md: 'row' }} mb="100px" mt={10}>
          <Flex direction="column" flexShrink={1} flexGrow={1}>
            <TopicRecommendedLearningMaterials
              topic={topic}
              learningMaterialsPreviews={learningMaterials}
              isLoading={resourcesLoading}
              reloadRecommendedResources={() => refetchLearningMaterials()}
              learningMaterialsOptions={learningMaterialsOptions}
              setLearningMaterialsOptions={setLearningMaterialsOptions}
            />
            {/* <DomainConceptGraph domain={domain} isLoading={loading} minNbRelationships={5} /> */}
            {/* <DomainLearningPaths domain={domain} /> */}
          </Flex>
          {/* <Stack
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
          </Stack> */}
          <BestXPagesLinks topicKey={topic.key} />
        </Flex>
      </>
    </TopicPageLayout>
  );
};
