import { Box, Button, Flex, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';

import { ConceptList } from '../../../components/concepts/ConceptList';
import { PageLayout } from '../../../components/layout/PageLayout';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { UserRole } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';

export const ConceptListPagePath = (domainKey: string) => `/domains/${domainKey}/concepts`;

export const ConceptListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Concepts',
  path: ConceptListPagePath(domain.key),
  routePath: ConceptListPagePath('[key]'),
});

export const ConceptListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      title={domain.name + ' - Concepts'}
    >
      <Flex direction="column" alignItems="center">
        <Box width="80%">
          <ConceptList domainKey={domain.key} />
        </Box>
        <Box p={5}>
          {currentUser && currentUser.role === UserRole.Admin && (
            <>
              <Button onClick={() => Router.push(`${router.asPath}/new`)}>+ Add concept</Button>
            </>
          )}
        </Box>
      </Flex>
    </PageLayout>
  );
};

export default ConceptListPage;
