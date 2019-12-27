import { Box, Button, Text, Flex, Link } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useGetDomainByKey } from '../../src/graphql/domains/domains.hooks';
import NextLink from 'next/link';
import { ResourceList } from '../../src/components/resources/ResourceList';
import { ConceptList } from '../../src/components/concepts/ConceptList';

const DomainPage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  const { domain } = useGetDomainByKey(key);

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

export default DomainPage;
