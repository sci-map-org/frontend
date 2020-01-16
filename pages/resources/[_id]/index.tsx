import { useRouter } from 'next/router';

import { ResourcePage } from '../../../src/components/pages/resources/ResourcePage';

const Page: React.FC = () => {
  const router = useRouter();

  const { _id } = router.query;

  if (typeof _id !== 'string') return null;

  return <ResourcePage resourceId={_id} />;
};

export default Page;
