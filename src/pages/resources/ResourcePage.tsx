import { Box, Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
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
import { ShowedInTopicLink } from '../../components/lib/Typography';
import { PageLink } from '../../components/navigation/InternalLink';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceCompletedCheckbox } from '../../components/resources/elements/ResourceCompletedCheckbox';
import { ResourceTypeBadge } from '../../components/resources/elements/ResourceType';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { ResourceYoutubePlayer } from '../../components/resources/elements/ResourceYoutubePlayer';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';
import { LearningMaterialWithCoveredTopicsData } from '../../graphql/learning_materials/learning_materials.fragments';
import { generateResourceData, ResourceData, ResourceLinkData } from '../../graphql/resources/resources.fragments';
import { ResourceLinkDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { ResourceType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
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
const columnsWidth = '220px';
export const ResourcePage: React.FC<{ resourceKey: string }> = ({ resourceKey }) => {
  const { data, loading, error } = useGetResourceResourcePageQuery({ variables: { resourceKey } });

  const resource = data?.getResourceByKey || resourceDataPlaceholder;
  const { currentUser } = useCurrentUser();
  if (!data && !loading) return <NotFoundPage />;
  return (
    <PageLayout
      marginSize="sm"
      // title={resource.name}
      // isLoading={loading}
      // centerChildren
      // renderLeft={
      //   (resource.previousResource || resource.nextResource) && (
      //     <Box w="200px" pt="100px" fontSize="md">
      //       {resource.previousResource && (
      //         <RelatedResourceLink type="previous" relatedResource={resource.previousResource} />
      //       )}
      //     </Box>
      //   )
      // }
      // renderRight={
      //   (resource.previousResource || resource.nextResource) && (
      //     <Box w="200px" pt="100px" fontSize="md">
      //       {resource.nextResource && <RelatedResourceLink type="next" relatedResource={resource.nextResource} />}
      //     </Box>
      //   )
      // }
      // renderTopRight={<TopRightIconButtons loading={loading} resource={resource} />}
      // renderTopLeft={
      //   'Showed In'
      //   // TODO
      //   // <ParentDomainsNavigationBlock domains={(resource.coveredConceptsByDomain || []).map(({ domain }) => domain)} />
      // }
    >
      <Flex direction="row" alignItems="stretch">
        <Flex direction="column" w={columnsWidth} mr={pageLayoutMarginSizesMapping.sm.px} position="relative">
          {resource.showedIn && (
            <Flex direction="column" position="absolute">
              <Text fontWeight={700} color="gray.600">
                Showed In
              </Text>
              <Stack ml={3}>
                {resource.showedIn.map((showedInTopic) => (
                  <ShowedInTopicLink key={showedInTopic._id} topic={showedInTopic} />
                ))}
              </Stack>
            </Flex>
          )}
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
            {/* <Center>
              <EditableLearningMaterialOutcomes
                editable={!!currentUser}
                learningMaterial={resource}
                isLoading={loading}
              />
          </Center>*/}
          </Stack>
        </Flex>
        <Flex flexGrow={1} minW="300px" direction="column" alignItems="stretch">
          <Stack h={headerHeight} alignItems="center" spacing={2} justifyContent="center">
            <Heading color="gray.700">{resource.name}</Heading>
            <SubTitleBar resource={resource} isLoading={!!loading} />
          </Stack>
          <Flex direction="column">
            <Box mb={1}>
              <EditableLearningMaterialTags
                learningMaterial={resource}
                isLoading={loading}
                isDisabled={!currentUser}
                placeholder="Add tags"
                size="md"
              />
            </Box>
            <Box mb={2}>
              <ResourceUrlLink resource={resource} isLoading={loading} maxLength={100} size="lg" />
              {/* {intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length === 0 && (
              )} */}
            </Box>
            <Box mb={1}>
              {resource.description && <LearningMaterialDescription description={resource.description} />}
            </Box>
            {intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length >= 1 && (
              <Center mr={4}>
                <ResourceYoutubePlayer resource={resource} skipThumbnail />
              </Center>
            )}
          </Flex>
          <Stack spacing={4}>
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
            <Flex justifyContent="space-between" alignItems="flex-end">
              {/* <Stack direction="row" spacing={2} alignItems="baseline"> */}
              {/* <DurationViewer value={resource.durationSeconds} /> */}
              {/* </Stack> */}
              {/* <Stack direction="row" spacing={2} alignItems="center">
                <RoleAccess accessRule="contributorOrAdmin">
                  <LearningMaterialStarsRater learningMaterial={resource} isDisabled={loading} />
                </RoleAccess>
                <StarsRatingViewer value={resource.rating} />
                <ResourceCompletedCheckbox resource={resource} size="sm" />
              </Stack> */}
            </Flex>

            <Flex direction="row" justifyContent="space-between">
              <Stack spacing={4} flexGrow={1}>
                {/* <Box>
                  <Skeleton isLoaded={!loading}>
                    <Stack direction="row">
                      {resource.types.map((type) => (
                        <ResourceTypeBadge key={type} type={type} />
                      ))}
                    </Stack>
                  </Skeleton>
                </Box> */}
              </Stack>
            </Flex>

            {/* TODO */}
            {/* {(isResourceSeriesType(resource.type) || resource.subResourceSeries?.length) && (
          <SubResourceSeriesManager
            resourceId={resourceId}
            subResourceSeries={resource.subResourceSeries || undefined}
            domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
          />
        )} */}
            {/* TODO */}
            {/* {(isResourceGroupType(resource.type) || resource.subResources?.length) && (
          <ResourceSubResourcesManager
            resourceId={resourceId}
            subResources={resource.subResources || []}
            domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
          />
        )} */}
          </Stack>
        </Flex>
        <Flex direction="column" w={columnsWidth} ml={pageLayoutMarginSizesMapping.sm.px} position="relative">
          {resource.createdBy && (
            <Center position="absolute" top={2} w="100%">
              <Stack direction="column" alignItems="center" spacing={1}>
                <Text fontSize="md" fontWeight={600} color="gray.500">
                  Shared By
                </Text>
                <UserAvatar user={resource.createdBy} size="sm" showBorder />
              </Stack>
            </Center>
          )}

          <Stack spacing={5} alignItems="center" mt={headerHeight}>
            <LearningMaterialRecommendationsViewer learningMaterial={resource} isLoading={loading} size="lg" />
          </Stack>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

const TopRightIconButtons: React.FC<{
  loading?: boolean;
  resource: GetResourceResourcePageQuery['getResourceByKey'];
}> = ({ loading, resource }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  const [deleteResource] = useDeleteResourceMutation();
  return (
    <Stack direction="row" spacing={2}>
      <RoleAccess accessRule="loggedInUser">
        <Button size="sm" variant="outline" onClick={() => Router.push(`${router.asPath}/edit`)} isDisabled={loading}>
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
          isDisabled={loading}
          onConfirmation={() => deleteResource({ variables: { _id: resource._id } }).then(() => Router.back())}
        />
      </Access>
    </Stack>
  );
};

const RelatedResourceLink: React.FC<{
  type: 'previous' | 'next' | 'parent' | 'series_parent';
  relatedResource: ResourceLinkDataFragment;
}> = ({ type, relatedResource }) => {
  return (
    <Stack
      fontWeight={300}
      textAlign="center"
      alignItems="center"
      direction={type === 'parent' || type === 'series_parent' ? 'row' : 'column'}
    >
      {type === 'previous' && <BsArrowLeft />}
      {type === 'next' && <BsArrowRight />}
      {type === 'parent' && <BsArrow90DegUp />}
      {type === 'series_parent' && <BsArrow90DegUp />}

      <PageLink fontWeight={500} fontStyle="italic" pageInfo={ResourcePageInfo(relatedResource)}>
        {relatedResource.name}
      </PageLink>
    </Stack>
  );
};

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
