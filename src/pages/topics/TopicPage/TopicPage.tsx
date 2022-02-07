import { Box, Button, Flex, Link, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useUnauthentificatedModal } from '../../../components/auth/UnauthentificatedModal';
import { PageLayout } from '../../../components/layout/PageLayout';
import { TopicPageLayout } from '../../../components/layout/TopicPageLayout';
import { LearningPathIcon } from '../../../components/lib/icons/LearningPathIcon';
import { ResourceIcon } from '../../../components/lib/icons/ResourceIcon';
import { TopicIcon } from '../../../components/lib/icons/TopicIcon';
import { TopicLink } from '../../../components/lib/links/TopicLink';
import { PageTitle } from '../../../components/lib/Typography';
import { PageButtonLink } from '../../../components/navigation/InternalLink';
import { NewResourceModal } from '../../../components/resources/NewResource';
import { AlsoPartOfTopicsViewer } from '../../../components/topics/AlsoPartOfTopicsViewer';
import { BestXPagesLinks } from '../../../components/topics/BestXPagesLinks';
import { EditablePartOfTopicsData } from '../../../components/topics/EditablePartOfTopics';
import { TopicDescription } from '../../../components/topics/fields/TopicDescription';
import { NewTopicModal } from '../../../components/topics/NewTopic';
import {
  ParentTopicsBreadcrumbs,
  ParentTopicsBreadcrumbsData,
} from '../../../components/topics/ParentTopicsBreadcrumbs';
import { SubTopicFilterDataFragment } from './SubTopicFilter.generated';
import { MapVisualisationTopicData } from '../../../components/topics/SubTopicsMapVisualisation';
import { SubTopicsMinimap } from '../../../components/topics/SubTopicsMinimap';
import { TopicSubHeader, TopicSubHeaderData } from '../../../components/topics/TopicSubHeader';
import { generateTopicData, TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLearningMaterialsSortingType } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { NewLearningPathPageInfo } from '../../RoutesPageInfos';
import { SeeAlso, SeeAlsoData } from './SeeAlso';
import { GetTopicByKeyTopicPageQuery, useGetTopicByKeyTopicPageQuery } from './TopicPage.generated';
import {
  TopicPageLearningMaterialsFeed,
  TopicPageLearningMaterialsFeedOptions,
  useTopicPageLearningMaterialsFeed,
} from './TopicPageLearningMaterialsFeed';

export const getTopicByKeyTopicPage = gql`
  query getTopicByKeyTopicPage($key: String!) {
    getTopicByKey(topicKey: $key) {
      _id
      name
      description
      wikipediaPageUrl
      isDisambiguation
      ...MapVisualisationTopicData
      subTopics {
        subTopic {
          ...MapVisualisationTopicData
        }
      }
      contextualisedTopics {
        ...TopicLinkData
      }
      ...ParentTopicsBreadcrumbsData
      ...TopicSubHeaderData
      ...EditablePartOfTopicsData
      ...SeeAlsoData
    }
  }
  ${MapVisualisationTopicData}
  ${TopicLinkData}
  ${ParentTopicsBreadcrumbsData}
  ${TopicSubHeaderData}
  ${EditablePartOfTopicsData}
  ${SeeAlsoData}
`;

const placeholderTopicData: GetTopicByKeyTopicPageQuery['getTopicByKey'] = {
  ...generateTopicData(),
};

export const TopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const { data, loading, error, refetch } = useGetTopicByKeyTopicPageQuery({
    variables: { key: topicKey },
  });

  const { currentUser } = useCurrentUser();
  const { onOpen: onOpenUnauthentificatedModal } = useUnauthentificatedModal();

  const [learningMaterialsFeedOptions, setLearningMaterialsFeedOptions] =
    useState<TopicPageLearningMaterialsFeedOptions>({
      mainTopicKey: topicKey,
      selectedSubTopicKey: null,
      sorting: TopicLearningMaterialsSortingType.Rating,
      page: 1,
      typeFilters: {},
      tagsFilters: [],
    });

  useEffect(() => {
    // Behaviour when switching page -- maybe keep same sorting/type filters ?
    setLearningMaterialsFeedOptions({
      mainTopicKey: topicKey,
      selectedSubTopicKey: null,
      sorting: TopicLearningMaterialsSortingType.Rating,
      page: 1,
      typeFilters: {},
      tagsFilters: [],
    });
  }, [topicKey]);
  const {
    loading: learningMaterialsFeedLoading,
    initialLoading: learningMaterialsFeedInitialLoading,
    isReloading: learningMaterialsFeedReloading,
    isRefetching: learningMaterialsFeedIsRefetching,
    lastSelectedTopic,
    learningMaterials,
    totalPages,
    feedAvailableFilters,
    refetch: refetchLearningMaterials,
  } = useTopicPageLearningMaterialsFeed(learningMaterialsFeedOptions);

  const [selectedSubTopic, setSelectedSubTopic] = useState<null | SubTopicFilterDataFragment>(null);

  useEffect(() => {
    lastSelectedTopic && lastSelectedTopic._id !== topic._id && setSelectedSubTopic(lastSelectedTopic);
  }, [lastSelectedTopic]);

  useEffect(() => {
    if (!learningMaterialsFeedOptions.selectedSubTopicKey) setSelectedSubTopic(null);
  }, [learningMaterialsFeedOptions.selectedSubTopicKey]);

  const topic = data?.getTopicByKey || placeholderTopicData;

  if (error) return null;

  if (topic.isDisambiguation)
    return (
      <PageLayout>
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight={600} color="teal.600">
            Disambiguation:
          </Text>
          <PageTitle pl={12}>{topic.name}</PageTitle>
        </Box>
        <Box mt={16}>
          <Text>
            <Text as="span" fontWeight={600} fontStyle="italic">
              {topic.name}
            </Text>{' '}
            may refer to:
          </Text>
          <Stack ml={8} mt={2}>
            {topic.contextualisedTopics?.map((contextualisedTopic) => (
              <TopicLink key={contextualisedTopic._id} topic={contextualisedTopic} size="lg" showContext />
            ))}
          </Stack>
        </Box>
      </PageLayout>
    );
  return (
    <TopicPageLayout
      renderTopLeftNavigation={<ParentTopicsBreadcrumbs topic={topic} isLoading={loading} />}
      renderTopRightNavigation={<AlsoPartOfTopicsViewer topic={topic} />}
      renderTitle={
        <PageTitle backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))">
          {topic.name}
        </PageTitle>
      }
      renderBlockBelowTitle={
        <Flex direction="column" pb={{ base: 4, md: 0 }}>
          <Box pt="2px" pb={3}>
            <TopicSubHeader topic={topic} size="md" mt={2} displayManage />
          </Box>
          {topic && topic.description && (
            <Skeleton isLoaded={!loading}>
              <TopicDescription
                topicDescription={topic.description}
                mt={3}
                backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
                noOfLines={5}
              />
            </Skeleton>
          )}
          {topic.wikipediaPageUrl && (
            <Skeleton isLoaded={!loading}>
              <Link
                href={topic.wikipediaPageUrl}
                color="blue.500"
                fontSize="sm"
                fontWeight={500}
                textDecor="underline"
                isExternal
              >
                Wikipedia
              </Link>
            </Skeleton>
          )}
        </Flex>
      }
      renderMinimap={(pxWidth, pxHeight) => (
        <SubTopicsMinimap
          topic={topic}
          isLoading={!!loading || !!learningMaterialsFeedLoading}
          subTopics={(topic.subTopics || []).map(({ subTopic }) => subTopic)}
          parentTopic={topic.parentTopic || undefined}
          pxWidth={pxWidth}
          pxHeight={pxHeight}
        />
      )}
      isLoading={loading}
    >
      <Flex direction={{ base: 'column', lg: 'row' }} mb="60px" mt={10} width="100%">
        <Flex direction="column" flexGrow={1}>
          <TopicPageLearningMaterialsFeed
            mainTopic={topic}
            selectedSubTopic={selectedSubTopic}
            feedOptions={learningMaterialsFeedOptions}
            setFeedOptions={setLearningMaterialsFeedOptions}
            subTopics={topic.subTopics?.map(({ subTopic }) => subTopic) || []}
            feedAvailableFilters={feedAvailableFilters}
            learningMaterials={learningMaterials}
            totalPages={totalPages}
            isLoading={learningMaterialsFeedLoading}
            initialLoading={learningMaterialsFeedInitialLoading}
            isReloading={learningMaterialsFeedReloading || learningMaterialsFeedIsRefetching}
          />
        </Flex>
        <Stack
          ml={{ base: 0, lg: 10 }}
          mt={{ base: 10, lg: 0 }}
          direction={{ base: 'column', md: 'row', lg: 'column' }}
          w={{ base: '100%', lg: '270px' }}
          spacing={{ base: 4, md: 'auto', lg: 10 }}
          flexBasis={{ base: '100%', lg: '270px' }}
          flexGrow={0}
          flexShrink={0}
        >
          <Stack direction="column" spacing={4} alignItems="flex-end">
            <NewResourceModal
              defaultResourceCreationData={{
                showInTopics: [topic],
              }}
              onResourceCreated={() => refetchLearningMaterials()}
              renderButton={(openModal) => (
                <Button
                  leftIcon={<ResourceIcon boxSize={6} />}
                  variant="solid"
                  colorScheme="teal"
                  isDisabled={loading}
                  onClick={() => {
                    if (!currentUser) return onOpenUnauthentificatedModal();
                    openModal();
                  }}
                >
                  Share new Resource
                </Button>
              )}
            />

            <NewTopicModal
              parentTopic={topic}
              renderButton={(openModal) => (
                <Button
                  leftIcon={<TopicIcon />}
                  variant="solid"
                  colorScheme="blue"
                  isDisabled={loading}
                  onClick={() => {
                    if (!currentUser) return onOpenUnauthentificatedModal();
                    openModal();
                  }}
                >
                  Suggest SubTopic
                </Button>
              )}
              onCreated={() => refetch()}
              onSubTopicConnected={() => refetch()}
            />
            <PageButtonLink
              leftIcon={<LearningPathIcon boxSize={7} />}
              variant="solid"
              colorScheme="teal"
              pageInfo={NewLearningPathPageInfo}
              loggedInOnly
              isDisabled={loading}
            >
              Share your Path
            </PageButtonLink>
          </Stack>
          <SeeAlso topic={topic} />
          {/* <BestXPagesLinks topicKey={topic.key} /> TODO - fix*/}
        </Stack>
      </Flex>
    </TopicPageLayout>
  );
};
