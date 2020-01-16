import { Box, Flex, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

import { ResourceList } from '../../../../components/resources/ResourceList';
import { useGetDomainByKey } from '../../../../graphql/domains/domains.hooks';

export const DomainResourceListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);

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
      <Box width="80%" py={5}>
        <ResourceList domainKey={domain.key} />
      </Box>
    </Box>
  );
};
