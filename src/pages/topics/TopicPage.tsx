import { Box, Button, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { useUnauthentificatedModal } from '../../components/auth/UnauthentificatedModal';
import { PageLayout } from '../../components/layout/PageLayout';
import { TopicPageLayout } from '../../components/layout/TopicPageLayout';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathIcon } from '../../components/lib/icons/LearningPathIcon';
import { ResourceIcon } from '../../components/lib/icons/ResourceIcon';
import { TopicLink } from '../../components/lib/links/TopicLink';
import { PageTitle } from '../../components/lib/Typography';
import { PageButtonLink } from '../../components/navigation/InternalLink';
import { NewResourceModal } from '../../components/resources/NewResource';
import { ResourcePreviewCardDataFragment } from '../../components/resources/ResourcePreviewCard.generated';
import { BestXPagesLinks } from '../../components/topics/BestXPagesLinks';
import { EditablePartOfTopics, EditablePartOfTopicsData } from '../../components/topics/EditablePartOfTopics';
import { TopicDescription } from '../../components/topics/fields/TopicDescription';
import { NewTopicModal } from '../../components/topics/NewTopic';
import { ParentTopicsBreadcrumbs, ParentTopicsBreadcrumbsData } from '../../components/topics/ParentTopicsBreadcrumbs';
import { SeeAlso, SeeAlsoData } from '../../components/topics/SeeAlso';
import { MapVisualisationTopicData } from '../../components/topics/SubTopicsMapVisualisation';
import { SubTopicsMinimap } from '../../components/topics/SubTopicsMinimap';
import { TopicRecommendedLearningMaterials } from '../../components/topics/TopicRecommendedLearningMaterials';
import { useGetTopicRecommendedLearningMaterialsQuery } from '../../components/topics/TopicRecommendedLearningMaterials.generated';
import { TopicSubHeader, TopicSubHeaderData } from '../../components/topics/TopicSubHeader';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLearningMaterialsOptions, TopicLearningMaterialsSortingType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { NewLearningPathPageInfo, NewResourcePageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyTopicPageQuery, useGetTopicByKeyTopicPageQuery } from './TopicPage.generated';

export const getTopicByKeyTopicPage = gql`
  query getTopicByKeyTopicPage($key: String!) {
    getTopicByKey(topicKey: $key) {
      _id
      name
      description
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
      renderTopRightNavigation={<EditablePartOfTopics topic={topic} editable={false} align="right" />}
      renderTitle={
        <Heading
          fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
          fontWeight={500}
          color="blackAlpha.800"
          backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
        >
          <PageTitle>{topic.name}</PageTitle>
        </Heading>
      }
      renderBlockBelowTitle={
        <>
          <Box pt={2} pb={2}>
            <TopicSubHeader topic={topic} size="md" mt={2} />
          </Box>
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
              <TopicDescription
                topicDescription={topic.description}
                mt={3}
                backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
                // TODO
                noOfLines={4}
              />
            </Skeleton>
          )}
          <Flex direction="row" w="100%">
            <Stack direction="row" spacing={4} pl={0} pt={10} pb={{ base: 4, lg: 12 }} pr={10} alignItems="flex-start">
              <NewResourceModal
                defaultResourceCreationData={{
                  showInTopics: [topic],
                }}
                onResourceCreated={() => refetchLearningMaterials()}
                renderButton={(openModal) => (
                  <Button
                    leftIcon={<ResourceIcon boxSize={6} />}
                    variant="solid"
                    colorScheme="blue"
                    isDisabled={loading}
                    onClick={() => {
                      if (!currentUser) return onOpenUnauthentificatedModal();
                      openModal();
                    }}
                  >
                    Add Resource
                  </Button>
                )}
              />
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
                  onSubTopicConnected={() => refetch()}
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
          <Stack ml={{ base: 0, md: 10 }} mb={10} direction={{ base: 'row', md: 'column' }}>
            <SeeAlso topic={topic} />
            <BestXPagesLinks topicKey={topic.key} />
          </Stack>
        </Flex>
      </>
    </TopicPageLayout>
  );
};
