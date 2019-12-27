import { Box, Flex, Link, Text, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';

import { ConceptList } from '../../../../src/components/concepts/ConceptList';
import { useGetDomainByKey } from '../../../../src/graphql/domains/domains.hooks';
import { useCurrentUser } from '../../../../src/graphql/users/users.hooks';
import { UserRole } from '../../../../src/graphql/types';

const ConceptListPage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  const { currentUser } = useCurrentUser();

  if (!key || typeof key !== 'string') return null;

  const { domain } = useGetDomainByKey(key);

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Flex width="80%" direction="row" justify="space-between" align="center">
        <Box>
          <NextLink href={`/domains/${domain.key}`}>
            <Link>
              Go back to <em>{domain.name}</em>
            </Link>
          </NextLink>
        </Box>
        <Box>
          <Text fontSize="3xl">{domain.name} - Concepts</Text>
        </Box>
        <Box>
          {currentUser && currentUser.role === UserRole.Admin && (
            <>
              <Button onClick={() => Router.push(`${router.asPath}/new`)}>+ Add concept</Button>
            </>
          )}
        </Box>
      </Flex>
      <Box width="80%" py={5}>
        <ConceptList domainKey={domain.key} />
      </Box>
    </Box>
  );
};

export default ConceptListPage;
