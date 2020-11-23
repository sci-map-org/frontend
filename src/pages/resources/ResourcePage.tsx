import { Box, Button, Flex, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import { Access } from '../../components/auth/Access';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  LearningMaterialStarsRater,
  StarsRatingViewer,
} from '../../components/learning_materials/LearningMaterialStarsRating';
import {
  LearningMaterialTagsEditor,
  SelectedTagsViewer,
} from '../../components/learning_materials/LearningMaterialTagsEditor';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { InternalLink } from '../../components/navigation/InternalLink';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceDescription } from '../../components/resources/elements/ResourceDescription';
import { ResourceMediaTypeBadge } from '../../components/resources/elements/ResourceMediaType';
import { ResourceTypeBadge } from '../../components/resources/elements/ResourceType';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { LearningMaterialCoveredTopics } from '../../components/resources/LearningMaterialCoveredTopics';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { SubResourceSeriesManager } from '../../components/resources/SubResourceSeriesManager';
import { ResourceSubResourcesManager } from '../../components/resources/SubResourcesManager';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateResourceData, ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { isResourceGroupType, isResourceSeriesType } from '../../services/resources.service';
import { PageInfo } from '../PageInfo';
import { GetResourceResourcePageQuery, useGetResourceResourcePageQuery } from './ResourcePage.generated';

export const ResourcePagePath = (resourceId: string) => `/resources/${resourceId}`;

export const ResourcePageInfo = (resource: Pick<ResourceDataFragment, '_id' | 'name'>): PageInfo => ({
  name: `${resource.name}`,
  path: ResourcePagePath(resource._id),
  routePath: ResourcePagePath('[_id]'),
});

export const getResourceResourcePage = gql`
  query getResourceResourcePage($id: String!) {
    getResourceById(id: $id) {
      ...ResourceData
      creator {
        _id
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
    }
  }
  ${SquareResourceCardData}
  ${DomainData}
  ${ResourceData}
  ${ConceptData}
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
  const selectedTags = resource.tags || [];

  return (
    <PageLayout
      title={resource.name}
      isLoading={loading}
      centerChildren
      renderLeft={
        (resource.previousResource || resource.nextResource) && (
          <Box w="200px" pt="100px">
            {resource.previousResource && (
              <RelatedResourceLink text="Previous:" relatedResource={resource.previousResource} />
            )}
          </Box>
        )
      }
      renderRight={
        (resource.previousResource || resource.nextResource) && (
          <Box w="200px" pt="100px">
            {resource.nextResource && <RelatedResourceLink text="Next:" relatedResource={resource.nextResource} />}
          </Box>
        )
      }
      renderTopRight={<TopRightIconButtons loading={loading} resource={resource} />}
    >
      <Stack w={['30rem', '36rem', '40rem', '50rem']} spacing={4}>
        {resource.parentResources && resource.parentResources.length && (
          <Text fontSize="lg" fontWeight={300} textAlign="center">
            {resource.parentResources.map((parentResource, idx) => (
              <RelatedResourceLink
                key={parentResource._id}
                text={idx === 0 ? 'Part of: ' : ', '}
                relatedResource={parentResource}
              />
            ))}
          </Text>
        )}
        {resource.seriesParentResource && (
          <RelatedResourceLink text="Part of Series: " relatedResource={resource.seriesParentResource} />
        )}
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" spacing={2} alignItems="baseline">
            <ResourceUrlLink fontSize="md" resource={resource} isLoading={loading} />
            <DurationViewer value={resource.durationMs} />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <StarsRatingViewer value={resource.rating} />
            <RoleAccess accessRule="contributorOrAdmin">
              <LearningMaterialStarsRater learningMaterialId={resource._id} isDisabled={loading} />
            </RoleAccess>
          </Stack>
        </Flex>

        <Flex direction="row" justifyContent="space-between">
          <Stack spacing={4} flexGrow={1}>
            <Box>
              <Skeleton isLoaded={!loading}>
                <ResourceTypeBadge type={resource.type} /> - <ResourceMediaTypeBadge mediaType={resource.mediaType} />{' '}
              </Skeleton>
            </Box>
            <RoleAccess
              accessRule="loggedInUser"
              renderAccessDenied={() => <SelectedTagsViewer selectedTags={selectedTags} />}
            >
              <LearningMaterialTagsEditor
                size="sm"
                placeholder="Add tags"
                learningMaterial={resource}
                isDisabled={loading}
              />
            </RoleAccess>
            {resource.description && <ResourceDescription description={resource.description} />}
          </Stack>

          <LearningMaterialCoveredTopics editMode="loggedInUser" isLoading={loading} learningMaterial={resource} />
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

const RelatedResourceLink: React.FC<{ text?: string; relatedResource: Pick<ResourceDataFragment, '_id' | 'name'> }> = ({
  text,
  relatedResource,
}) => {
  return (
    <Text fontSize="lg" fontWeight={300} textAlign="center" as="span">
      {!!text && text + ' '}
      <InternalLink
        fontWeight={500}
        fontStyle="italic"
        asHref={`/resources/${relatedResource._id}`}
        routePath="/resources/[_id]"
      >
        {relatedResource.name}
      </InternalLink>
    </Text>
  );
};
