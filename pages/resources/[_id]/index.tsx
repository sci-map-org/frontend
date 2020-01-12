import { Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { PageLayout } from '../../../src/components/layout/Page';
import { ResourcePage } from '../../../src/components/pages/resources/ResourcePage';
import { useGetResourceWithCoveredConcepts } from '../../../src/graphql/resources/resources.hooks';

const Page: React.FC = () => {
  const router = useRouter();

  const { _id } = router.query;

  if (typeof _id !== 'string') return null;

  // const { resource } = useGetResourceWithCoveredConcepts(_id);

  return (
    <PageLayout>
      <ResourcePage resourceId={_id} />
    </PageLayout>
  );
};

export default Page;
