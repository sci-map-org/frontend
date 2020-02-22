import { Box, Button, Flex, Link, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { PageLayout } from '../../components/layout/PageLayout';
import { DomainLearningPaths } from '../../components/learning_paths/DomainLearningPaths';
import { DomainRecommendedResources } from '../../components/resources/DomainRecommendedResources';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { useGetDomainByKeyDomainPageQuery } from './DomainPage.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';

export const getDomainByKeyDomainPage = gql`
  query getDomainByKeyDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
        items {
          concept {
            ...ConceptData
          }
          relationship {
            index
          }
        }
      }
      resources(options: { pagination: { limit: 30 } }) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${DomainData}
  ${ConceptData}
  ${ResourcePreviewData}
`;

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();
  const { data } = useGetDomainByKeyDomainPageQuery({ variables: { key: domainKey } });
  const domain = data?.getDomainByKey;
  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();
  const { currentUser } = useCurrentUser();
  if (!domain) return <Box>Domain not found !</Box>;

  return (
    <PageLayout>
      <Flex direction="row" alignItems="center">
        <Text fontSize="4xl">Learn {domain.name}</Text>
        <Box flexGrow={1}></Box>
        {currentUser && (
          <NextLink href={router.asPath + '/resources/new'}>
            <Button variant="outline">+ Add resource</Button>
          </NextLink>
        )}
        {mockedFeaturesEnabled && (
          <Box ml={2}>
            <NextLink href={router.asPath + '/resources/indexing_queue'}>
              <Button variant="solid" fontStyle="italic">
                32 Pending Resources
              </Button>
            </NextLink>
          </Box>
        )}
      </Flex>
      {domain.description && (
        <Box mb={2} fontWeight={250}>
          {domain.description}
        </Box>
      )}
      {/* <Box mb={4}>
        <NextLink href={`${router.asPath}/resources`}>
          <Link>All Resources </Link>
        </NextLink> */}
      {/* |
        <NextLink href={`${router.asPath}/concepts`}>
          <Link> Detailed Concept List</Link>
        </NextLink> */}
      {/* </Box> */}
      <Flex direction="row">
        {domain.concepts && (
          <Flex direction="column" flexShrink={0}>
            <DomainConceptList domain={domain} />
          </Flex>
        )}
        {domain.resources && (
          <Flex direction="column" flexShrink={1} flexGrow={1}>
            <DomainRecommendedResources domain={domain} resourcePreviews={domain.resources.items} />
            {mockedFeaturesEnabled && <DomainLearningPaths domain={domain} />}
          </Flex>
        )}
        {mockedFeaturesEnabled && (
          <Stack spacing={4} direction="column" ml={6} flexShrink={1}>
            <Box>
              <Text fontSize="2xl">Sub domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Elixir' },
                  { _id: 2, name: 'Clojure' },
                  { _id: 3, name: 'Haskell' },
                  { _id: 4, name: 'JavaScript Functional Programming' },
                ].map(domain => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Related domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Category Theory' },
                  { _id: 2, name: 'Object Oriented Programming' },
                ].map(domain => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Links</Text>
              <Stack direction="column"></Stack>
            </Box>
          </Stack>
        )}
      </Flex>
      {/* <Box>
        <Box mb={4}>
          <Text fontSize="2xl">Resources</Text>
          <Box mt={2}>
            <ResourceList domainKey={domain.key} />
          </Box>
        </Box>
        <Box mb={4}>
          <Text fontSize="2xl">Concepts</Text>
          <Box mt={2}>
            <ConceptList domainKey={domain.key} />
          </Box>
        </Box>
      </Box> */}
    </PageLayout>
  );
};
