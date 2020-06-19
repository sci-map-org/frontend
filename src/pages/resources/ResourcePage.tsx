import { Box, Skeleton, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { InternalLink } from '../../components/navigation/InternalLink';
import { ResourceCoveredConcepts } from '../../components/resources/ResourceCoveredConcepts';
import { ResourceMediaTypeBadge } from '../../components/resources/ResourceMediaType';
import { SelectedTagsEditor, SelectedTagsViewer } from '../../components/resources/ResourceTagsEditor';
import { ResourceTypeBadge } from '../../components/resources/ResourceType';
import { ResourceUrlLink } from '../../components/resources/ResourceUrl';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainWithConceptsData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateResourceData, ResourceData } from '../../graphql/resources/resources.fragments';
import {
  GetResourceResourcePageQuery,
  useAddTagsToResourceResourceEditorMutation,
  useGetResourceResourcePageQuery,
  useRemoveTagsFromResourceResourceEditorMutation,
} from './ResourcePage.generated';

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

  const [addTagsToResource] = useAddTagsToResourceResourceEditorMutation();
  const [removeTagsFromResource] = useRemoveTagsFromResourceResourceEditorMutation();

  if (error) return <Box>Resource not found !</Box>;

  const resource = data?.getResourceById || resourceDataPlaceholder;
  const selectedTags = resource.tags || [];

  return (
    <PageLayout
      title={resource.name}
      isLoading={loading}
      renderRight={
        <RoleAccess accessRule="loggedInUser">
          <InternalLink routePath="/resources/[_id]/edit" asHref={`${router.asPath}/edit`} isDisabled={loading}>
            Edit
          </InternalLink>
        </RoleAccess>
      }
    >
      <Stack spacing={2} alignItems="start">
        <Stack direction="row" spacing={2} alignItems="baseline">
          <ResourceUrlLink resource={resource} isLoading={loading} />
          {resource.durationMn && (
            <Text fontSize="sm" color="gray.400" mb={1}>
              {resource.durationMn}mn
            </Text>
          )}
        </Stack>

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
      </Stack>
    </PageLayout>
  );
};
