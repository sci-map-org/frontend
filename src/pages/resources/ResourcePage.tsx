import {
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  Heading,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Skeleton,
} from '@chakra-ui/react';
import { BsArrow90DegUp } from '@react-icons/all-files/bs/BsArrow90DegUp';
import { BsArrowLeft } from '@react-icons/all-files/bs/BsArrowLeft';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import gql from 'graphql-tag';
import { intersection } from 'lodash';
import Router, { useRouter } from 'next/router';
import { Access } from '../../components/auth/Access';
import { PageLayout, pageLayoutMarginSizesMapping } from '../../components/layout/PageLayout';
import { EditableLearningMaterialCoveredTopics } from '../../components/learning_materials/EditableLearningMaterialCoveredTopics';
import {
  EditableLearningMaterialPrerequisites,
  EditableLearningMaterialPrerequisitesData,
} from '../../components/learning_materials/EditableLearningMaterialPrerequisites';
import { LearningMaterialDescription } from '../../components/learning_materials/LearningMaterialDescription';
import {
  LearningMaterialRecommendationsViewer,
  LearningMaterialRecommendationsViewerData,
} from '../../components/learning_materials/LearningMaterialRecommendationsViewer';
import { LearningMaterialRecommendButton } from '../../components/learning_materials/LearningMaterialRecommendButton';
import { LearningMaterialStarsRaterData } from '../../components/learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../../components/learning_materials/LearningMaterialTagsEditor';
import { LearningMaterialTypesViewer } from '../../components/learning_materials/LearningMaterialTypesViewer';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { ShowedInTopicLink, SocialWidgetsLabelStyleProps } from '../../components/lib/Typography';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceCompletedCheckbox } from '../../components/resources/elements/ResourceCompletedCheckbox';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { ResourceYoutubePlayer } from '../../components/resources/elements/ResourceYoutubePlayer';
import { ResourceMiniCard, ResourceMiniCardData } from '../../components/resources/ResourceMiniCard';
import { ResourceMiniCardDataFragment } from '../../components/resources/ResourceMiniCard.generated';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { SubResourceSeriesManager } from '../../components/resources/SubResourceSeriesManager';
import { ResourceSubResourcesManager } from '../../components/resources/SubResourcesManager';
import { Discussion, DiscussionData } from '../../components/social/comments/Discussion';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';
import { LearningMaterialWithCoveredTopicsData } from '../../graphql/learning_materials/learning_materials.fragments';
import { generateResourceData, ResourceData, ResourceLinkData } from '../../graphql/resources/resources.fragments';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { DiscussionLocation, ResourceType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { NotFoundPage } from '../NotFoundPage';
import { GetResourceResourcePageQuery, useGetResourceResourcePageQuery } from './ResourcePage.generated';

export const getResourceResourcePage = gql`
  query getResourceResourcePage($resourceKey: String!) {
    getResourceByKey(resourceKey: $resourceKey) {
      ...ResourceData
      createdBy {
        ...UserAvatarData
      }
      showedIn {
        ...TopicLinkData
      }
      subResources {
        ...SquareResourceCardData
      }
      subResourceSeries {
        ...ResourceMiniCardData
      }
      parentResources {
        ...ResourceMiniCardData
      }
      seriesParentResource {
        ...ResourceMiniCardData
      }
      previousResource {
        ...ResourceMiniCardData
      }
      nextResource {
        ...ResourceMiniCardData
      }
      ...LearningMaterialWithCoveredTopicsData
      ...EditableLearningMaterialPrerequisitesData
      ...LearningMaterialStarsRaterData
      ...LearningMaterialRecommendationsViewerData
      comments(options: { pagination: {} }) {
        ...DiscussionData
      }
    }
  }
  ${SquareResourceCardData}
  ${ResourceData}
  ${UserAvatarData}
  ${EditableLearningMaterialPrerequisitesData}
  ${LearningMaterialStarsRaterData}
  ${LearningMaterialWithCoveredTopicsData}
  ${LearningMaterialRecommendationsViewerData}
  ${ResourceMiniCardData}
  ${DiscussionData}
`;

// TODO
const resourceDataPlaceholder: GetResourceResourcePageQuery['getResourceByKey'] = {
  ...generateResourceData(),
};

const headerHeight = '160px';
const columnsWidth = '210px';
export const ResourcePage: React.FC<{ resourceKey: string }> = ({ resourceKey }) => {
  const { data, loading, error, refetch } = useGetResourceResourcePageQuery({ variables: { resourceKey } });
  const layout: 'mobile' | 'desktop' = useBreakpointValue({ base: 'mobile', lg: 'desktop' }) || 'desktop';
  const resource = data?.getResourceByKey || resourceDataPlaceholder;
  const { currentUser } = useCurrentUser();
  if (!data && !loading) return <NotFoundPage />;
  return (
    <PageLayout marginSize="sm">
      <Flex direction={layout === 'desktop' ? 'row' : 'column'} alignItems="stretch">
        {layout === 'desktop' ? (
          // left column
          <Flex
            direction="column"
            flexBasis={columnsWidth}
            flexShrink={0}
            mr={pageLayoutMarginSizesMapping.sm.px}
            position="relative"
          >
            <Box position="absolute">
              <ShowedInBlock resource={resource} isLoading={loading} size={layout === 'desktop' ? 'md' : 'sm'} />
            </Box>
            <Stack spacing={5} mt={headerHeight}>
              <Center>
                <EditableLearningMaterialPrerequisites
                  editable={!!currentUser}
                  learningMaterial={resource}
                  isLoading={loading}
                />
              </Center>
              <EditableLearningMaterialCoveredTopics
                editable={!!currentUser}
                isLoading={loading}
                learningMaterial={resource}
                showedInTopics={resource.showedIn || undefined}
              />
            </Stack>
          </Flex>
        ) : (
          // top row
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <ShowedInBlock resource={resource} isLoading={loading} size="sm" />
            </Box>
            <TopRightIconButtons resource={resource} isLoading={loading} size="sm" />
          </Flex>
        )}
        <Flex direction="column" alignItems="stretch" flexShrink={1} flexGrow={1}>
          <HeaderBlock resource={resource} isLoading={loading} />
          <MainContentBlock resource={resource} isLoading={loading} mt={3} />
          {!loading && (
            <Discussion
              discussionLocation={DiscussionLocation.LearningMaterialPage}
              discussionEntityId={resource._id}
              commentResults={resource.comments || undefined}
              isLoading={loading}
            />
          )}
          {layout === 'mobile' && (
            <Center>
              <Box maxW="80%">
                <PartOfSeriesBlock resource={resource} isLoading={loading} />
              </Box>
            </Center>
          )}
          {!!resource.subResourceSeries?.length && (
            <Center pt={8}>
              <SubResourceSeriesManager
                resourceId={resource._id}
                subResourceSeries={resource.subResourceSeries || undefined}
              />
            </Center>
          )}
          {!!resource.subResources?.length && (
            <ResourceSubResourcesManager resourceId={resource._id} subResources={resource.subResources || []} />
          )}
        </Flex>
        {layout === 'mobile' && (
          <Flex justifyContent="space-around" mt={6}>
            <Flex justifyContent="center" w="45%">
              <EditableLearningMaterialPrerequisites
                editable={!!currentUser}
                learningMaterial={resource}
                isLoading={loading}
              />
            </Flex>
            <Flex justifyContent="center" w="45%">
              <EditableLearningMaterialCoveredTopics
                editable={!!currentUser}
                isLoading={loading}
                learningMaterial={resource}
                showedInTopics={resource.showedIn || undefined}
              />
            </Flex>
          </Flex>
        )}
        <Flex
          alignItems="stretch"
          flexShrink={0}
          {...(layout === 'desktop'
            ? {
                ml: pageLayoutMarginSizesMapping.sm.px,
                flexBasis: columnsWidth,
                maxW: columnsWidth,
                flexGrow: 0,
                direction: 'column',
              }
            : {
                mt: 6,
                justifyContent: 'space-around',
                direction: 'row',
              })}
        >
          <Flex
            {...(layout === 'desktop'
              ? { h: headerHeight, direction: 'column', alignItems: 'stretch' }
              : { w: '45%', alignItems: 'center', justifyContent: 'center' })}
          >
            {layout === 'desktop' && (
              <Flex justifyContent="flex-end" mb={3}>
                <TopRightIconButtons resource={resource} isLoading={loading} size="sm" />
              </Flex>
            )}
            {resource.createdBy && (
              <Flex justifyContent="center" {...(layout === 'mobile' ? {} : {})}>
                <Stack direction="column" alignItems="center" spacing={1}>
                  <Text {...SocialWidgetsLabelStyleProps('lg')}>Shared By</Text>
                  <UserAvatar user={resource.createdBy} size="sm" showBorder />
                </Stack>
              </Flex>
            )}
          </Flex>

          <Center {...(layout === 'desktop' ? { w: '100%' } : { w: '45%' })}>
            <LearningMaterialRecommendationsViewer learningMaterial={resource} isLoading={loading} size="lg" />
          </Center>
          {layout === 'desktop' && (
            <Center mt={8} maxW="100%">
              <PartOfSeriesBlock resource={resource} isLoading={loading} />
            </Center>
          )}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

const TopRightIconButtons: React.FC<{
  isLoading: boolean;
  resource: GetResourceResourcePageQuery['getResourceByKey'];
  size?: 'sm' | 'md';
}> = ({ isLoading, resource, size = 'md' }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  const [deleteResource] = useDeleteResourceMutation();
  return (
    <Stack direction="row" spacing={2}>
      <Access
        condition={
          currentUser &&
          (currentUser.role === UserRole.Admin ||
            currentUser.role === UserRole.Contributor ||
            currentUser._id === resource.createdBy?._id)
        }
      >
        <Button
          size={getChakraRelativeSize(size, -1)}
          variant="outline"
          onClick={() => Router.push(`${router.asPath}/edit`)}
          isDisabled={isLoading}
        >
          Edit
        </Button>
      </Access>
      <Access
        condition={
          currentUser &&
          (currentUser.role === UserRole.Admin ||
            currentUser.role === UserRole.Contributor ||
            currentUser._id === resource.createdBy?._id)
        }
      >
        <DeleteButtonWithConfirmation
          variant="outline"
          modalHeaderText="Delete Resource"
          modalBodyText="Confirm deleting this resource ?"
          isDisabled={isLoading}
          onConfirmation={() => deleteResource({ variables: { _id: resource._id } }).then(() => Router.back())}
          size={getChakraRelativeSize(size, -1)}
        />
      </Access>
    </Stack>
  );
};

const SubTitleBar: React.FC<{ resource: GetResourceResourcePageQuery['getResourceByKey']; isLoading: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Stack spacing={2} direction="row" alignItems="center">
        <LearningMaterialTypesViewer learningMaterialTypes={resource.types} />
        <DurationViewer value={resource.durationSeconds} />
        <LearningMaterialRecommendButton
          learningMaterialId={resource._id}
          isRecommended={!!resource.recommended}
          size="xs"
          isDisabled={isLoading}
        />
        <ResourceCompletedCheckbox size="xs" resource={resource} isLoading={isLoading} />,
      </Stack>
    </Skeleton>
  );
};

const ShowedInBlock: React.FC<{
  resource: GetResourceResourcePageQuery['getResourceByKey'];
  isLoading: boolean;
  size: 'sm' | 'md';
}> = ({ resource, isLoading, size }) => {
  return resource.showedIn?.length ? (
    <Flex direction="column">
      <Text fontWeight={700} color="gray.600" fontSize={size}>
        Showed In
      </Text>
      <Stack ml={3}>
        {resource.showedIn.map((showedInTopic) => (
          <ShowedInTopicLink key={showedInTopic._id} topic={showedInTopic} size={size} />
        ))}
      </Stack>
    </Flex>
  ) : null;
};

const HeaderBlock: React.FC<{ resource: GetResourceResourcePageQuery['getResourceByKey']; isLoading: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <Stack h={headerHeight} alignItems="center" spacing={2} justifyContent="center">
      <Skeleton isLoaded={!isLoading}>
        <Heading color="gray.700" textAlign="center">
          {resource.name}
        </Heading>
      </Skeleton>
      <SubTitleBar resource={resource} isLoading={isLoading} />
    </Stack>
  );
};

const MainContentBlock: React.FC<
  {
    resource: GetResourceResourcePageQuery['getResourceByKey'];
    isLoading: boolean;
  } & Omit<FlexProps, 'resource'>
> = ({ resource, isLoading, ...props }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex direction="column" {...props}>
      <Box mb={1}>
        <EditableLearningMaterialTags
          learningMaterial={resource}
          isLoading={isLoading}
          isDisabled={!currentUser}
          placeholder="Add tags"
          size="md"
        />
      </Box>
      <Flex mb={2}>
        <ResourceUrlLink resource={resource} isLoading={isLoading} maxLength={45} size="lg" />
      </Flex>
      <Box mb={1}>
        {resource.description && (
          <LearningMaterialDescription description={resource.description} isLoading={isLoading} />
        )}
      </Box>
      {intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length >= 1 && (
        <Center mr={4}>
          <ResourceYoutubePlayer resource={resource} skipThumbnail />
        </Center>
      )}
    </Flex>
  );
};

const PartOfSeriesBlock: React.FC<{
  resource: GetResourceResourcePageQuery['getResourceByKey'];
  isLoading: boolean;
}> = ({ resource, isLoading }) => {
  const element = (type: 'Part Of' | 'Previous' | 'Next', resources: ResourceMiniCardDataFragment[]) => (
    <Flex direction="column" overflow="hidden">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Icon
          as={
            {
              'Part Of': BsArrow90DegUp,
              Previous: BsArrowLeft,
              Next: BsArrowRight,
            }[type]
          }
          boxSize="20px"
          color="gray.600"
        />

        <Text fontWeight={600} color="gray.500" fontSize="16px">
          {type}
        </Text>
      </Stack>
      {resources.map((resource) => (
        <Box key={resource._id} pl={2}>
          <ResourceMiniCard resource={resource} />
        </Box>
      ))}
    </Flex>
  );
  return (
    <Flex overflow="hidden">
      <Stack spacing={3} overflow="hidden">
        {!!resource.seriesParentResource && element('Part Of', [resource.seriesParentResource])}
        {!!resource.parentResources?.length && element('Part Of', resource.parentResources)}
        {!!resource.previousResource && element('Previous', [resource.previousResource])}
        {!!resource.nextResource && element('Next', [resource.nextResource])}
      </Stack>
    </Flex>
  );
};
