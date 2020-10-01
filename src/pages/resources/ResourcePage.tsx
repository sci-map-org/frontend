import { Box, Button, Skeleton, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import { Access } from '../../components/auth/Access';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { ResourceCoveredConceptsByDomainViewer } from '../../components/resources/ResourceCoveredConceptsByDomainViewer';
import { ResourceDomainAndCoveredConceptsSelector } from '../../components/resources/ResourceDomainAndCoveredConceptsSelector';
import { ResourceDuration } from '../../components/resources/ResourceDuration';
import { ResourceMediaTypeBadge } from '../../components/resources/ResourceMediaType';
import { ResourceSeriesManager } from '../../components/resources/ResourceSeriesManager';
import { ResourceStarsRater, ResourceStarsRating } from '../../components/resources/ResourceStarsRating';
import { ResourceTagsEditor, SelectedTagsViewer } from '../../components/resources/ResourceTagsEditor';
import { ResourceTypeBadge } from '../../components/resources/ResourceType';
import { ResourceUrlLink } from '../../components/resources/ResourceUrl';
import { SubResourcesManager } from '../../components/resources/SubResourcesManager';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateResourceData, ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
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
        ...ResourceData
      }
      subResourceSeries {
        ...ResourceData
      }
    }
  }
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
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  const [deleteResource] = useDeleteResourceMutation();
  if (error) return <Box>Resource not found !</Box>;

  const resource = data?.getResourceById || resourceDataPlaceholder;
  const selectedTags = resource.tags || [];

  return (
    <PageLayout
      title={resource.name}
      isLoading={loading}
      renderRight={
        <Stack direction="row" spacing={2}>
          <RoleAccess accessRule="loggedInUser">
            <Button
              size="sm"
              variant="outline"
              onClick={() => Router.push(`${router.asPath}/edit`)}
              isDisabled={loading}
            >
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
              onConfirmation={() => deleteResource({ variables: { _id: resourceId } }).then(() => Router.back())}
            />
          </Access>
        </Stack>
      }
    >
      <Stack spacing={2} alignItems="start">
        <Stack direction="row" spacing={2} alignItems="baseline">
          <ResourceUrlLink resource={resource} isLoading={loading} />
          <ResourceDuration value={resource.durationMs} />
          <ResourceStarsRating value={resource.rating} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <RoleAccess accessRule="contributorOrAdmin">
            <ResourceStarsRater resourceId={resource._id} />
          </RoleAccess>
        </Stack>

        <Text>{resource.description}</Text>

        <Box>
          <Skeleton isLoaded={!loading}>
            <ResourceTypeBadge type={resource.type} /> - <ResourceMediaTypeBadge mediaType={resource.mediaType} />{' '}
          </Skeleton>
        </Box>
        <ResourceSeriesManager
          resourceId={resourceId}
          subResourceSeries={resource.subResourceSeries || undefined}
          domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
        />
        <SubResourcesManager
          resourceId={resourceId}
          subResources={resource.subResources || []}
          domains={resource.coveredConceptsByDomain?.map((i) => i.domain) || []}
        />
        <RoleAccess accessRule="loggedInUser">
          <ResourceTagsEditor resource={resource} isDisabled={loading} />
        </RoleAccess>
        <RoleAccess accessRule="notLoggedInUser">
          <SelectedTagsViewer selectedTags={selectedTags} />
        </RoleAccess>
        {resource.coveredConceptsByDomain && (
          <RoleAccess
            accessRule="loggedInUser"
            renderAccessDenied={() => <ResourceCoveredConceptsByDomainViewer resource={resource} isLoading={loading} />}
          >
            <ResourceDomainAndCoveredConceptsSelector resource={resource} />
          </RoleAccess>
        )}
      </Stack>
    </PageLayout>
  );
};
