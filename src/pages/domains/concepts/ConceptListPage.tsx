import { Box, Stack } from '@chakra-ui/core';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { ConceptList } from '../../../components/concepts/ConceptList';
import { PageLayout } from '../../../components/layout/PageLayout';
import { InternalButtonLink } from '../../../components/navigation/InternalLink';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';

export const ConceptListPagePath = (domainKey: string) => `/domains/${domainKey}/concepts`;

export const ConceptListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Concepts',
  path: ConceptListPagePath(domain.key),
  routePath: ConceptListPagePath('[key]'),
});

export const ConceptListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      title={domain.name + ' - Concepts'}
      centerChildren
    >
      <Stack spacing={4} width="36rem">
        <Box>
          <ConceptList domainKey={domain.key} />
        </Box>
        <RoleAccess accessRule="admin">
          <InternalButtonLink
            variant="outline"
            routePath="/domains/[key]/concepts/new"
            asHref={`/domains/${domain.key}/concepts/new`}
          >
            + Add concept
          </InternalButtonLink>
        </RoleAccess>
      </Stack>
    </PageLayout>
  );
};

export default ConceptListPage;
