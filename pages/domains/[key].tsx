import { Box, Button, Text, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { useGetDomainByKey } from '../../src/graphql/domains/domains.hooks';
import Link from 'next/link';

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
        <Link href={router.asPath + '/resources/new'}>
          <Button>+ Add resource</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default DomainPage;
