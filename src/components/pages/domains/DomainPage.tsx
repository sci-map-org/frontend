import { Box, Button, Flex, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { ConceptList } from '../../concepts/ConceptList';
import { ResourceList } from '../../resources/ResourceList';
import { useRouter } from 'next/router';

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Domain not found !</Box>;

  return (
    <Box px={50} py={50} mx={100} mt={10} borderWidth={1}>
      <Flex direction="row">
        <Text fontSize="3xl">{domain.name}</Text>
        <Box flexGrow={1}></Box>
        <NextLink href={router.asPath + '/resources/new'}>
          <Button>+ Add resource</Button>
        </NextLink>
      </Flex>
      <Box mb={4}>
        <NextLink href={`${router.asPath}/resources`}>
          <Link>Resources </Link>
        </NextLink>
        |
        <NextLink href={`${router.asPath}/concepts`}>
          <Link> Concepts</Link>
        </NextLink>
      </Box>
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
  );
};
