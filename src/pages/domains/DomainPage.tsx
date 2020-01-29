import { Box, Button, Flex, Link, Text, Stack } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useGetDomainByKey } from '../../graphql/domains/domains.hooks';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { ConceptList } from '../../components/concepts/ConceptList';
import { PageLayout } from '../../components/layout/PageLayout';
import { DomainRecommendedResources } from '../../components/resources/DomainRecommendedResources';
import { ResourceList } from '../../components/resources/ResourceList';
import { DomainLearningPaths } from '../../components/learning_paths/DomainLearningPaths';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();
  const { domain } = useGetDomainByKey(domainKey);

  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();

  if (!domain) return <Box>Domain not found !</Box>;

  return (
    <PageLayout>
      <Flex direction="row" alignItems="center">
        <Text fontSize="4xl">Learn {domain.name}</Text>
        <Box flexGrow={1}></Box>
        <NextLink href={router.asPath + '/resources/new'}>
          <Button>+ Add resource</Button>
        </NextLink>
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
      <Box mb={4}>
        <NextLink href={`${router.asPath}/resources`}>
          <Link>Resources </Link>
        </NextLink>
        |
        <NextLink href={`${router.asPath}/concepts`}>
          <Link> Concepts</Link>
        </NextLink>
      </Box>
      {mockedFeaturesEnabled ? (
        <Flex direction="row">
          <Flex direction="column" flexShrink={1}>
            <DomainConceptList domain={domain} />
          </Flex>
          <Flex direction="column" flexShrink={2}>
            <DomainRecommendedResources domain={domain} />
            <DomainLearningPaths domain={domain} />
          </Flex>
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
        </Flex>
      ) : (
        <Box>
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
        </Box>
      )}
    </PageLayout>
  );
};
