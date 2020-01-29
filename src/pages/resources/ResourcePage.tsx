import { Box, Flex, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { useGetResourceResourcePageQuery } from './ResourcePage.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';

export const getResourceResourcePage = gql`
  query getResourceResourcePage($id: String!) {
    getResourceById(id: $id) {
      ...ResourceData
      coveredConcepts(options: {}) {
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
      domains(options: {}) {
        items {
          _id
          key
          name
          concepts(options: {}) {
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
  const { data } = useGetResourceResourcePageQuery({ variables: { id: resourceId } });
  const router = useRouter();
  if (!data) return <Box>Resource not found !</Box>;
  const resource = data.getResourceById;

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
          {resource.domains &&
            resource.domains.items.map(domain => (
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
