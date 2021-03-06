import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import { Access } from '../../components/auth/Access';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { ParentDomainsNavigationBlock } from '../../components/domains/ParentDomainsNavigationBlock';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  EditableLearningMaterialOutcomes,
  EditableLearningMaterialOutcomesData,
} from '../../components/learning_materials/EditableLearningMaterialOutcomes';
import {
  EditableLearningMaterialPrerequisites,
  EditableLearningMaterialPrerequisitesData,
} from '../../components/learning_materials/EditableLearningMaterialPrerequisites';
import {
  LearningMaterialStarsRater,
  LearningMaterialStarsRaterData,
} from '../../components/learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../../components/learning_materials/LearningMaterialTagsEditor';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { StarsRatingViewer } from '../../components/lib/StarsRating';
import { InternalLink } from '../../components/navigation/InternalLink';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceCompletedCheckbox } from '../../components/resources/elements/ResourceCompletedCheckbox';
import { ResourceDescription } from '../../components/resources/elements/ResourceDescription';
import { ResourceMediaTypeBadge } from '../../components/resources/elements/ResourceMediaType';
import { ResourceTypeBadge } from '../../components/resources/elements/ResourceType';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { ResourceYoutubePlayer } from '../../components/resources/elements/ResourceYoutubePlayer';
import { LearningMaterialCoveredTopics } from '../../components/resources/LearningMaterialCoveredTopics';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { SubResourceSeriesManager } from '../../components/resources/SubResourceSeriesManager';
import { ResourceSubResourcesManager } from '../../components/resources/SubResourcesManager';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateResourceData, ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { ResourceType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { isResourceGroupType, isResourceSeriesType } from '../../services/resources.service';
import { GetResourceResourcePageQuery, useGetResourceResourcePageQuery } from './ResourcePage.generated';
import { BsArrowLeft } from '@react-icons/all-files/bs/BsArrowLeft';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { BsArrow90DegUp } from '@react-icons/all-files/bs/BsArrow90DegUp';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';

export const getResourceResourcePage = gql`
  query getResourceResourcePage($id: String!) {
    getResourceById(id: $id) {
      ...ResourceData
      creator {
        ...UserAvatarData
      }
      coveredConceptsByDomain {
        domain {
          ...DomainData
        }
        coveredConcepts {
          ...ConceptData
        }
      }
      subResources {
        ...SquareResourceCardData
      }
      subResourceSeries {
        ...ResourceData
      }
      parentResources {
        _id
        name
      }
      seriesParentResource {
        _id
        name
      }
      previousResource {
        _id
        name
      }
      nextResource {
        _id
        name
      }
      ...EditableLearningMaterialOutcomesData
      ...EditableLearningMaterialPrerequisitesData
      ...LearningMaterialStarsRaterData
    }
  }
  ${SquareResourceCardData}
  ${DomainData}
  ${ResourceData}
  ${ConceptData}
  ${UserAvatarData}
  ${EditableLearningMaterialOutcomesData}
  ${EditableLearningMaterialPrerequisitesData}
  ${LearningMaterialStarsRaterData}
`;

const domainDataPlaceholder = generateDomainData();
const resourceDataPlaceholder: GetResourceResourcePageQuery['getResourceById'] = {
  ...generateResourceData(),
  coveredConceptsByDomain: [
    {
      domain: domainDataPlaceholder,
      coveredConcepts: [0, 0, 0, 0].map(() => ({
        ...generateConceptData(),
      })),
    },
  ],
};

export const ResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { data, loading, error } = useGetResourceResourcePageQuery({ variables: { id: resourceId } });
  if (error) return <Box>Resource not found !</Box>;
  const resource = data?.getResourceById || resourceDataPlaceholder;
  const { currentUser } = useCurrentUser();
  return (
    <PageLayout
      title={resource.name}
      isLoading={loading}
      centerChildren
      renderLeft={
        (resource.previousResource || resource.nextResource) && (
          <Box w="200px" pt="100px" fontSize="md">
            {resource.previousResource && (
              <RelatedResourceLink type="previous" relatedResource={resource.previousResource} />
            )}
          </Box>
        )
      }
      renderRight={
        (resource.previousResource || resource.nextResource) && (
          <Box w="200px" pt="100px" fontSize="md">
            {resource.nextResource && <RelatedResourceLink type="next" relatedResource={resource.nextResource} />}
          </Box>
        )
      }
      renderTopRight={<TopRightIconButtons loading={loading} resource={resource} />}
      renderTopLeft={
        <ParentDomainsNavigationBlock domains={(resource.coveredConceptsByDomain || []).map(({ domain }) => domain)} />
      }
    >
      <Stack w={['30rem', '36rem', '40rem', '50rem']} spacing={4}>
        {(resource.parentResources && resource.parentResources.length) ||
          (resource.seriesParentResource && (
            <Stack spacing={1} alignItems="center">
              {(resource.parentResources || []).map((parentResource, idx) => (
                <RelatedResourceLink key={parentResource._id} type="parent" relatedResource={parentResource} />
              ))}
              {resource.seriesParentResource && (
                <RelatedResourceLink type="series_parent" relatedResource={resource.seriesParentResource} />
              )}
            </Stack>
          ))}
        <Flex justifyContent="space-between" alignItems="flex-end">
          {resource.creator && (
            <Stack direction="row" alignItems="center">
              <Text fontWeight={300} fontSize="md">
                Added By
              </Text>
              <UserAvatar user={resource.creator} size="xs" />
            </Stack>
          )}
          <Stack direction="row" spacing={2} alignItems="baseline">
            <ResourceUrlLink fontSize="md" resource={resource} isLoading={loading} />
            <DurationViewer value={resource.durationSeconds} />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <RoleAccess accessRule="contributorOrAdmin">
              <LearningMaterialStarsRater learningMaterial={resource} isDisabled={loading} />
            </RoleAccess>
            <StarsRatingViewer value={resource.rating} />
            <ResourceCompletedCheckbox resource={resource} size="sm" />
          </Stack>
        </Flex>

        <Flex direction="row" justifyContent="space-between">
          <Stack spacing={4} flexGrow={1}>
            <Box>
              <Skeleton isLoaded={!loading}>
                <ResourceTypeBadge type={resource.type} /> - <ResourceMediaTypeBadge mediaType={resource.mediaType} />{' '}
              </Skeleton>
            </Box>
            <Box>
              <EditableLearningMaterialTags
                learningMaterial={resource}
                isLoading={loading}
                isDisabled={!currentUser}
                placeholder="Add tags"
              />
            </Box>
            {resource.description && <ResourceDescription description={resource.description} />}
            {(resource.type === ResourceType.YoutubeVideo || resource.type === ResourceType.YoutubePlaylist) && (
              <Center mr={4}>
                <ResourceYoutubePlayer resource={resource} skipThumbnail />
              </Center>
            )}
          </Stack>

          <Stack spacing={3}>
            <Center>
              <EditableLearningMaterialPrerequisites
                editable={!!currentUser}
                learningMaterial={resource}
                isLoading={loading}
              />
            </Center>
            <LearningMaterialCoveredTopics editMode="loggedInUser" isLoading={loading} learningMaterial={resource} />
            <Center>
              <EditableLearningMaterialOutcomes
                editable={!!currentUser}
                learningMaterial={resource}
                isLoading={loading}
              />
            </Center>
          </Stack>
        </Flex>

        {(isResourceSeriesType(resource.type) || resource.subResourceSeries?.length) && (
          <SubResourceSeriesManager
            resourceId={resourceId}
            subResourceSeries={resource.subResourceSeries || undefined}
            domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
          />
        )}

        {(isResourceGroupType(resource.type) || resource.subResources?.length) && (
          <ResourceSubResourcesManager
            resourceId={resourceId}
            subResources={resource.subResources || []}
            domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
          />
        )}
      </Stack>
    </PageLayout>
  );
};

const TopRightIconButtons: React.FC<{
  loading?: boolean;
  resource: GetResourceResourcePageQuery['getResourceById'];
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
            currentUser._id === resource.creator?._id)
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
  relatedResource: Pick<ResourceDataFragment, '_id' | 'name'>;
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

      <InternalLink
        fontWeight={500}
        fontStyle="italic"
        asHref={`/resources/${relatedResource._id}`}
        routePath="/resources/[_id]"
      >
        {relatedResource.name}
      </InternalLink>
    </Stack>
  );
};
