import { Box, Flex } from '@chakra-ui/core';
import { NewResource } from '../../../../src/components/resources/NewResource';
import { useGetDomainByKey } from '../../../../src/graphql/domains/domains.hooks';
import { useRouter } from 'next/router';

const NewResourcePage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  const { domain } = useGetDomainByKey(key);
  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <Flex direction="column" alignItems="center">
      <Box width="46rem">
        <NewResource domain={domain}></NewResource>
      </Box>
    </Flex>
  );
};

export default NewResourcePage;
