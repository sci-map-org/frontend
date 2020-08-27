import { Box, Button, Skeleton, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import { Access } from '../../components/auth/Access';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { CoveredConceptsSelector } from '../../components/resources/CoveredConceptsSelector';
import { ResourceCoveredConcepts } from '../../components/resources/ResourceCoveredConcepts';
import { ResourceDuration } from '../../components/resources/ResourceDuration';
import { ResourceMediaTypeBadge } from '../../components/resources/ResourceMediaType';
import { SelectedTagsEditor, SelectedTagsViewer } from '../../components/resources/ResourceTagsEditor';
import { ResourceTypeBadge } from '../../components/resources/ResourceType';
import { ResourceUrlLink } from '../../components/resources/ResourceUrl';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateResourceData, ResourceData } from '../../graphql/resources/resources.fragments';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import {
  GetResourceResourcePageQuery,
  useAddTagsToResourceResourceEditorMutation,
  useGetResourceResourcePageQuery,
  useRemoveTagsFromResourceResourceEditorMutation,
} from './ResourcePage.generated';
import { ResourceStarsRatingSelector, ResourceStarsRating } from '../../components/resources/ResourceStarsRating';

export const addTagsToResourceResourceEditor = gql`
  mutation addTagsToResourceResourceEditor($resourceId: String!, $tags: [String!]!) {
    addTagsToResource(resourceId: $resourceId, tags: $tags) {
      _id
      tags {
        name
      }
    }
  }
`;

export const removeTagsFromResourceResourceEditor = gql`
  mutation removeTagsFromResourceResourceEditor($resourceId: String!, $tags: [String!]!) {
    removeTagsFromResource(resourceId: $resourceId, tags: $tags) {
      _id
      tags {
        name
      }
    }
  }
`;

export const getResourceResourcePage = gql`
  query getResourceResourcePage($id: String!) {
    getResourceById(id: $id) {
      ...ResourceData
      creator {
        _id
      }
      coveredConcepts(options: {}) {
        items {
          ...ConceptData
          domain {
            _id
            key
            name
          }
        }
      }
      domains(options: {}) {
        items {
          ...DomainWithConceptsData
        }
      }
    }
  }
  ${DomainWithConceptsData}
  ${ResourceData}
  ${ConceptData}
`;

const domainDataPlaceholder = generateDomainData();
const resourceDataPlaceholder: GetResourceResourcePageQuery['getResourceById'] = {
  ...generateResourceData(),
  coveredConcepts: {
    items: [0, 0, 0, 0].map(() => ({
      ...generateConceptData(),
      domain: domainDataPlaceholder,
    })),
  },
  domains: {
    items: [domainDataPlaceholder],
  },
};

export const ResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { data, loading, error } = useGetResourceResourcePageQuery({ variables: { id: resourceId } });
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  const [addTagsToResource] = useAddTagsToResourceResourceEditorMutation();
  const [removeTagsFromResource] = useRemoveTagsFromResourceResourceEditorMutation();
  const [deleteResource] = useDeleteResourceMutation();
  if (error) return <Box>Resource not found !</Box>;

  const resource = data?.getResourceById || resourceDataPlaceholder;
  const selectedTags = resource.tags || [];

  const conceptList: ConceptDataFragment[] = (resource.domains?.items || [])
    .map((domain) => {
      return !!domain.concepts ? domain.concepts.items : [];
    })
    .reduce((acc, items) => acc.concat(items), [])
    .map((item) => item.concept);

  return (
    <PageLayout
      title={resource.name}
      isLoading={loading}
      renderRight={
        <Stack direction="row" spacing={2} shouldWrapChildren={true}>
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
              currentUser && (currentUser.role === UserRole.Admin || currentUser._id === resource.creator?._id)
            }
          >
            <DeleteButtonWithConfirmation
              variant="outline"
              modalHeaderText="Delete Concept"
              modalBodyText="Confirm deleting this concept ?"
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
        <RoleAccess accessRule="admin">
          <ResourceStarsRatingSelector resourceId={resource._id} />
        </RoleAccess>

        <Text>{resource.description}</Text>

        <Box>
          <Skeleton isLoaded={!loading}>
            <ResourceTypeBadge type={resource.type} /> - <ResourceMediaTypeBadge mediaType={resource.mediaType} />{' '}
          </Skeleton>
        </Box>

        <RoleAccess accessRule="loggedInUser">
          <SelectedTagsEditor
            isDisabled={loading}
            selectedTags={selectedTags}
            onSelect={(t) => addTagsToResource({ variables: { resourceId: resource._id, tags: [t.name] } })}
            onRemove={(t) => removeTagsFromResource({ variables: { resourceId: resource._id, tags: [t.name] } })}
          />
        </RoleAccess>
        <RoleAccess accessRule="notLoggedInUser">
          <SelectedTagsViewer selectedTags={selectedTags} />
        </RoleAccess>
        {resource.domains && resource.coveredConcepts && (
          <ResourceCoveredConcepts
            domains={resource.domains.items}
            coveredConcepts={resource.coveredConcepts.items}
            isLoading={loading}
          />
        )}
        {resource.coveredConcepts && (
          <RoleAccess accessRule="admin">
            <CoveredConceptsSelector
              resourceId={resource._id}
              coveredConcepts={resource.coveredConcepts.items}
              conceptList={conceptList}
            />
          </RoleAccess>
        )}
      </Stack>
    </PageLayout>
  );
};
