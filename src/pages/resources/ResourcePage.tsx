import { Box, Flex, Link, Stack, Text, Icon } from '@chakra-ui/core';
import NextLink from 'next/link';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  useGetResourceResourcePageQuery,
  useAddTagsToResourceResourceEditorMutation,
  useRemoveTagsFromResourceResourceEditorMutation,
} from './ResourcePage.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceTypeBadge } from '../../components/resources/ResourceType';
import { ResourceMediaTypeBadge } from '../../components/resources/ResourceMediaType';
import { SelectedTagsEditor } from '../../components/resources/ResourceTagsEditor';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, DomainWithConceptsData } from '../../graphql/domains/domains.fragments';
import { ResourceCoveredConcepts } from '../../components/resources/ResourceCoveredConcepts';

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

export const ResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { data } = useGetResourceResourcePageQuery({ variables: { id: resourceId } });
  const router = useRouter();
  if (!data) return <Box>Resource not found !</Box>;
  const resource = data.getResourceById;
  const selectedTags = resource.tags || [];

  const [addTagsToResource] = useAddTagsToResourceResourceEditorMutation();
  const [removeTagsFromResource] = useRemoveTagsFromResourceResourceEditorMutation();

  return (
    <PageLayout>
      <Stack spacing={2}>
        <Flex direction="row" align="center" justify="space-between">
          <Text fontSize="3xl">{resource.name}</Text>
          <NextLink href={`${router.asPath}/edit`}>
            <Link>Edit</Link>
          </NextLink>
        </Flex>
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Link isExternal color="blue.700" href={resource.url}>
            {resource.url}
            <Icon name="external-link" mx="2px" />
          </Link>
          {resource.durationMn && (
            <Text fontSize="sm" color="gray.400" mb={1}>
              {resource.durationMn}mn
            </Text>
          )}
        </Stack>
        <Text>{resource.description}</Text>
        <Box>
          <ResourceTypeBadge type={resource.type} /> - <ResourceMediaTypeBadge mediaType={resource.mediaType} />
        </Box>
        <SelectedTagsEditor
          selectedTags={selectedTags}
          onSelect={t => addTagsToResource({ variables: { resourceId: resource._id, tags: [t.name] } })}
          onRemove={t => removeTagsFromResource({ variables: { resourceId: resource._id, tags: [t.name] } })}
        />
        {resource.domains && resource.coveredConcepts && (
          <ResourceCoveredConcepts domains={resource.domains.items} coveredConcepts={resource.coveredConcepts.items} />
        )}
      </Stack>
    </PageLayout>
  );
};
