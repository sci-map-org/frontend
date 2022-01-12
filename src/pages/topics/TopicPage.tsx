import { Box, Button, Flex, Link, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { useUnauthentificatedModal } from '../../components/auth/UnauthentificatedModal';
import { PageLayout } from '../../components/layout/PageLayout';
import { TopicPageLayout } from '../../components/layout/TopicPageLayout';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathIcon } from '../../components/lib/icons/LearningPathIcon';
import { ResourceIcon } from '../../components/lib/icons/ResourceIcon';
import { TopicIcon } from '../../components/lib/icons/TopicIcon';
import { TopicLink } from '../../components/lib/links/TopicLink';
import { PageTitle } from '../../components/lib/Typography';
import { PageButtonLink } from '../../components/navigation/InternalLink';
import { NewResourceModal } from '../../components/resources/NewResource';
import { ResourcePreviewCardDataFragment } from '../../components/resources/ResourcePreviewCard.generated';
import { AlsoPartOfTopicsViewer } from '../../components/topics/AlsoPartOfTopicsViewer';
import { BestXPagesLinks } from '../../components/topics/BestXPagesLinks';
import { EditablePartOfTopicsData } from '../../components/topics/EditablePartOfTopics';
import { TopicDescription } from '../../components/topics/fields/TopicDescription';
import { NewTopicModal } from '../../components/topics/NewTopic';
import { ParentTopicsBreadcrumbs, ParentTopicsBreadcrumbsData } from '../../components/topics/ParentTopicsBreadcrumbs';
import { SeeAlso, SeeAlsoData } from '../../components/topics/SeeAlso';
import { SubTopicFilter } from '../../components/topics/SubTopicFilter';
import { MapVisualisationTopicData } from '../../components/topics/SubTopicsMapVisualisation';
import { SubTopicsMinimap } from '../../components/topics/SubTopicsMinimap';
import { TopicRecommendedLearningMaterials } from '../../components/topics/TopicRecommendedLearningMaterials';
import { useGetTopicRecommendedLearningMaterialsQuery } from '../../components/topics/TopicRecommendedLearningMaterials.generated';
import { TopicSubHeader, TopicSubHeaderData } from '../../components/topics/TopicSubHeader';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLearningMaterialsOptions, TopicLearningMaterialsSortingType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { NewLearningPathPageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyTopicPageQuery, useGetTopicByKeyTopicPageQuery } from './TopicPage.generated';

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

  const [learningMaterialsOptions, setLearningMaterialsOptions] = useState<TopicLearningMaterialsOptions>({
    sortingType: TopicLearningMaterialsSortingType.Recommended,
    filter: { completedByUser: false },
  });

  const [learningMaterialPreviews, setLearningMaterialPreviews] = useState<
    (ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment)[]
  >([]);

  const { currentUser } = useCurrentUser();
  const { onOpen: onOpenUnauthentificatedModal } = useUnauthentificatedModal();

  const [subTopicFilterId, setSubTopicFilterId] = useState<string | null>(null);
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
        <>
          <Box pt="2px" pb={3}>
            <TopicSubHeader topic={topic} size="md" mt={2} />
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
      <Flex direction={{ base: 'column', lg: 'row' }} mb="60px" mt={10}>
        <Flex direction="column" flexShrink={1} flexGrow={1}>
          <Stack spacing={5}>
            <SubTopicFilter
              subTopics={topic.subTopics?.map((subTopic) => subTopic.subTopic) || []}
              selectedSubTopicId={subTopicFilterId}
              onChange={(newSubTopicFilterId) => setSubTopicFilterId(newSubTopicFilterId)}
            />
            <TopicRecommendedLearningMaterials
              topic={topic}
              learningMaterialsPreviews={learningMaterials}
              isLoading={resourcesLoading}
              reloadRecommendedResources={() => refetchLearningMaterials()}
              learningMaterialsOptions={learningMaterialsOptions}
              setLearningMaterialsOptions={setLearningMaterialsOptions}
            />
          </Stack>
        </Flex>
        <Stack
          ml={{ base: 0, lg: 10 }}
          mt={{ base: 10, lg: 0 }}
          direction={{ base: 'column', md: 'row', lg: 'column' }}
          w={{ base: '100%', lg: '270px' }}
          spacing={{ base: 4, md: 'auto', lg: 10 }}
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
          <BestXPagesLinks topicKey={topic.key} />
        </Stack>
      </Flex>
    </TopicPageLayout>
  );
};
