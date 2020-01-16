import { Box, Flex, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import gql from 'graphql-tag';
import { ResourceData } from '../../../graphql/resources/resources.generated';
import { useGetResourceWithCoveredConcepts } from '../../../graphql/resources/resources.hooks';
import { useRouter } from 'next/router';
import { PageLayout } from '../../layout/PageLayout';

export const GetResource = gql`
  query getResource(
    $id: String!
    $coveredConceptsOptions: ResourceCoveredConceptsOptions!
    $domainsOptions: ResourceDomainsOptions!
    $domainConceptsOptions: DomainConceptsOptions!
  ) {
    getResourceById(id: $id) {
      _id
      name
      coveredConcepts(options: $coveredConceptsOptions) {
        items {
          _id
          name
          domain {
            _id
            key
            name
          }
        }
      }
      domains(options: $domainsOptions) {
        items {
          _id
          key
          name
          concepts(options: $domainConceptsOptions) {
            items {
              _id
              name
            }
          }
        }
      }
    }
  }
  ${ResourceData}
`;

export const ResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { resource } = useGetResourceWithCoveredConcepts(resourceId);
  const router = useRouter();
  if (!resource) return <Box>Resource not found !</Box>;

  return (
    <PageLayout>
      <Stack spacing={2}>
        <Flex direction="row" align="center" justify="space-between">
          <Text fontSize="3xl">{resource.name}</Text>
          <NextLink href={`${router.asPath}/edit`}>
            <Link>Edit</Link>
          </NextLink>
        </Flex>
        <Text>{resource.description}</Text>
        <Link isExternal href={resource.url}>
          {resource.url}
        </Link>
        <Text>
          {resource.type} - {resource.mediaType}
        </Text>
        <Box>
          <Text fontSize="2xl">Domains</Text>
          {resource.domains?.items.map(domain => (
            <Box key={domain._id}>
              <Text fontSize="xl">{domain.name}</Text>
              {!!resource.coveredConcepts &&
                domain.concepts &&
                domain.concepts.items
                  .filter(
                    concept =>
                      // resource.coveredConcepts.items
                      resource.coveredConcepts && resource.coveredConcepts.items.find(c => c._id === concept._id)
                  )
                  .map(concept => <Box key={concept._id}>{concept.name}</Box>)}
            </Box>
          ))}
        </Box>
      </Stack>
    </PageLayout>
  );
};
