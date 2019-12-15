import { Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { withApollo } from '../../src/graphql/apollo';
import { useGetDomainByKey } from '../../src/graphql/domains/domains.hooks';

const DomainPage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  const { domain } = useGetDomainByKey(key);

  return (
    <Box px="200px" py="50px">
      {domain && <Box>{domain.name}</Box>}
    </Box>
  );
};

export default withApollo(DomainPage);
