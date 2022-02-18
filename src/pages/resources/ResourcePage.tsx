import { Box, Button, Center, Flex, FlexProps, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { BsArrow90DegUp } from '@react-icons/all-files/bs/BsArrow90DegUp';
import { BsArrowLeft } from '@react-icons/all-files/bs/BsArrowLeft';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import gql from 'graphql-tag';
import { intersection } from 'lodash';
import Router, { useRouter } from 'next/router';
import { Access } from '../../components/auth/Access';
import { RoleAccess } from '../../components/auth/RoleAccess';
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
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { ShowedInTopicLink, SocialWidgetsLabelStyleProps } from '../../components/lib/Typography';
import { PageLink } from '../../components/navigation/InternalLink';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceCompletedCheckbox } from '../../components/resources/elements/ResourceCompletedCheckbox';
import { ResourceTypeBadge } from '../../components/resources/elements/ResourceType';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { ResourceYoutubePlayer } from '../../components/resources/elements/ResourceYoutubePlayer';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { SubResourceSeriesManager } from '../../components/resources/SubResourceSeriesManager';
import { ResourceSubResourcesManager } from '../../components/resources/SubResourcesManager';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';
import { LearningMaterialWithCoveredTopicsData } from '../../graphql/learning_materials/learning_materials.fragments';
import { generateResourceData, ResourceData, ResourceLinkData } from '../../graphql/resources/resources.fragments';
import { ResourceLinkDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { ResourceType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { NotFoundPage } from '../NotFoundPage';
import { ResourcePageInfo } from '../RoutesPageInfos';
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
        ...ResourceData
      }
      parentResources {
        ...ResourceLinkData
      }
      seriesParentResource {
        ...ResourceLinkData
      }
      previousResource {
        ...ResourceLinkData
      }
      nextResource {
        ...ResourceLinkData
      }
      ...LearningMaterialWithCoveredTopicsData
      ...EditableLearningMaterialPrerequisitesData
      ...LearningMaterialStarsRaterData
      ...LearningMaterialRecommendationsViewerData
    }
  }
  ${SquareResourceCardData}
  ${ResourceData}
  ${UserAvatarData}
  ${EditableLearningMaterialPrerequisitesData}
  ${LearningMaterialStarsRaterData}
  ${LearningMaterialWithCoveredTopicsData}
  ${LearningMaterialRecommendationsViewerData}
  ${ResourceLinkData}
`;

// TODO
const resourceDataPlaceholder: GetResourceResourcePageQuery['getResourceByKey'] = {
  ...generateResourceData(),
};

const headerHeight = '160px';
const columnsWidth = '210px';
export const ResourcePage: React.FC<{ resourceKey: string }> = ({ resourceKey }) => {
  const { data, loading, error } = useGetResourceResourcePageQuery({ variables: { resourceKey } });
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
              />
            </Stack>
          </Flex>
        ) : (
          // top row
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <ShowedInBlock resource={resource} isLoading={loading} size="sm" />
            <TopRightIconButtons resource={resource} isLoading={loading} size="sm" />
          </Flex>
        )}
        <Flex direction="column" alignItems="stretch" flexShrink={1} flexGrow={1}>
          <HeaderBlock resource={resource} isLoading={loading} />
          <MainContentBlock resource={resource} isLoading={loading} mt={3} />

          {/* {(resource.parentResources && resource.parentResources.length) ||
              (resource.seriesParentResource && (
                <Stack spacing={1} alignItems="center">
                  {(resource.parentResources || []).map((parentResource, idx) => (
                    <RelatedResourceLink key={parentResource._id} type="parent" relatedResource={parentResource} />
                  ))}
                  {resource.seriesParentResource && (
                    <RelatedResourceLink type="series_parent" relatedResource={resource.seriesParentResource} />
                  )}
                </Stack>
              ))} */}

          {/* TODO (isResourceSeriesType(resource.type) || */}
          {!!resource.subResourceSeries?.length && (
            <SubResourceSeriesManager
              resourceId={resource._id}
              subResourceSeries={resource.subResourceSeries || undefined}
              // domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
            />
          )}
          {/* TODO isResourceGroupType(resource.type) ||  */}
          {!!resource.subResources?.length && (
            <ResourceSubResourcesManager
              resourceId={resource._id}
              subResources={resource.subResources || []}
              // domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
            />
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
                direction: 'column',
              }
            : {
                mt: 6,
                justifyContent: 'space-around',
                direction: 'row',
              })}
        >
          {resource.createdBy && (
            <Flex
              justifyContent="center"
              {...(layout === 'mobile' ? { w: '45%', alignItems: 'center' } : { h: headerHeight })}
            >
              <Stack direction="column" alignItems="center" spacing={1}>
                <Text {...SocialWidgetsLabelStyleProps('lg')}>Shared By</Text>
                <UserAvatar user={resource.createdBy} size="sm" showBorder />
              </Stack>
            </Flex>
          )}

          <Center {...(layout === 'desktop' ? { w: '100%' } : { w: '45%' })}>
            <LearningMaterialRecommendationsViewer learningMaterial={resource} isLoading={loading} size="lg" />
          </Center>
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
      <RoleAccess accessRule="loggedInUser">
        <Button
          size={getChakraRelativeSize(size, -1)}
          variant="outline"
          onClick={() => Router.push(`${router.asPath}/edit`)}
          isDisabled={isLoading}
        >
          Edit
        </Button>
      </RoleAccess>
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

// const RelatedResourceLink: React.FC<{
//   type: 'previous' | 'next' | 'parent' | 'series_parent';
//   relatedResource: ResourceLinkDataFragment;
// }> = ({ type, relatedResource }) => {
//   return (
//     <Stack
//       fontWeight={300}
//       textAlign="center"
//       alignItems="center"
//       direction={type === 'parent' || type === 'series_parent' ? 'row' : 'column'}
//     >
//       {type === 'previous' && <BsArrowLeft />}
//       {type === 'next' && <BsArrowRight />}
//       {type === 'parent' && <BsArrow90DegUp />}
//       {type === 'series_parent' && <BsArrow90DegUp />}

//       <PageLink fontWeight={500} fontStyle="italic" pageInfo={ResourcePageInfo(relatedResource)}>
//         {relatedResource.name}
//       </PageLink>
//     </Stack>
//   );
// };

const SubTitleBar: React.FC<{ resource: GetResourceResourcePageQuery['getResourceByKey']; isLoading: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      {resource.types.map((type) => (
        <ResourceTypeBadge key={type} type={type} />
      ))}
      <DurationViewer value={resource.durationSeconds} />
      <LearningMaterialRecommendButton
        learningMaterialId={resource._id}
        isRecommended={!!resource.recommended}
        size="xs"
        isDisabled={isLoading}
      />
      <ResourceCompletedCheckbox size="xs" resource={resource} isLoading={isLoading} />,
    </Stack>
  );
};

const ShowedInBlock: React.FC<{
  resource: GetResourceResourcePageQuery['getResourceByKey'];
  isLoading: boolean;
  size: 'sm' | 'md';
}> = ({ resource, isLoading, size }) => {
  return resource.showedIn ? (
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
      <Heading color="gray.700" textAlign="center">
        {resource.name}
      </Heading>
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
      <Box mb={1}>{resource.description && <LearningMaterialDescription description={resource.description} />}</Box>
      {intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length >= 1 && (
        <Center mr={4}>
          <ResourceYoutubePlayer resource={resource} skipThumbnail />
        </Center>
      )}
    </Flex>
  );
};
