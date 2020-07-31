import { Box } from '@chakra-ui/core';

import { PageLayout } from '../../../components/layout/PageLayout';
import { ResourceList } from '../../../components/resources/ResourceList';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';

export const DomainResourceListPagePath = (domainKey: string) => `/domains/${domainKey}/resources`;

export const DomainResourceListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Resources',
  path: DomainResourceListPagePath(domain.key),
  routePath: DomainResourceListPagePath('[key]'),
});

export const DomainResourceListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <PageLayout title={`${domain.name} - Resources`} breadCrumbsLinks={[DomainPageInfo(domain)]}>
      <Box width="80%" py={5}>
        <ResourceList domainKey={domain.key} />
      </Box>
    </PageLayout>
  );
};
