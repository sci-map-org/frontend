import { Box } from '@chakra-ui/core';

import { useGetDomainByKey } from '../../../../graphql/domains/domains.hooks';
import { PageLayout } from '../../../layout/PageLayout';
import { NewResource } from '../../../resources/NewResource';

export const AddResourceToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Domain not found</Box>;

  return (
    <PageLayout>
      <NewResource domain={domain} />
    </PageLayout>
  );
};
