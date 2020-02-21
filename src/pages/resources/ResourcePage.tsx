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
          _id
          key
          name
          concepts(options: {}) {
            items {
              ...ConceptData
            }
          }
        }
      }
    }
  }
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
        <Box>
          <Text fontSize="2xl">Domains</Text>
          <Stack spacing={2} pl={4}>
            {resource.domains &&
              resource.domains.items.map(domain => (
                <Box key={domain._id}>
                  <NextLink href={`/domains/${domain.key}`}>
                    <Link fontSize="xl">{domain.name}</Link>
                  </NextLink>
                  <Stack spacing={1} pl={4}>
                    {!!resource.coveredConcepts && domain.concepts && (
                      <>
                        <Text fontWeight={700}>Covered Concepts</Text>
                        {domain.concepts.items
                          .filter(
                            concept =>
                              resource.coveredConcepts &&
                              resource.coveredConcepts.items.find(c => c._id === concept._id)
                          )
                          .map(concept => (
                            <Box key={concept._id} ml={2}>
                              <NextLink href={`/domains/${domain.key}/concepts/${concept.key}`}>
                                <Link fontSize="md">{concept.name}</Link>
                              </NextLink>
                            </Box>
                          ))}
                      </>
                    )}
                  </Stack>
                </Box>
              ))}
          </Stack>
        </Box>
      </Stack>
    </PageLayout>
  );
};
