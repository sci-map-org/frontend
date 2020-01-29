import { Box, Button, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';

import { ConceptList } from '../../../components/concepts/ConceptList';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { UserRole } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { PageLayout } from '../../../components/layout/PageLayout';

export const ConceptListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <PageLayout>
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
      <Box width="80%" py={5}>
        <ConceptList domainKey={domain.key} />
      </Box>
    </PageLayout>
  );
};

export default ConceptListPage;
