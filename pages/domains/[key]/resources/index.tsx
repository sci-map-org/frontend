import { useRouter } from 'next/router';
import { Box, Text, Stack, Flex, Link } from '@chakra-ui/core';
import { ResourceList } from '../../../../src/components/resources/ResourceList';
import { useGetDomainByKey } from '../../../../src/graphql/domains/domains.hooks';
import NextLink from 'next/link';
export const ResourceListPage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (!key || typeof key !== 'string') return null;

  const { domain } = useGetDomainByKey(key);

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Flex width="80%" direction="row" justify="space-between" align="flex-end">
        <Box>
          <NextLink href={`/domains/${domain.key}`}>
            <Link>
              Go back to <em>{domain.name}</em>
            </Link>
          </NextLink>
        </Box>
        <Box>
          <Text fontSize="3xl">{domain.name} - Resources</Text>
        </Box>
        <Box></Box>
      </Flex>
      <Box width="80%">
        <ResourceList domainKey={domain.key} />
      </Box>
    </Box>
  );
};

export default ResourceListPage;
