import { useRouter } from 'next/router';

import { ResourcePage } from '../../../src/pages/resources/ResourcePage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') return null;

  return <ResourcePage resourceKey={key} />;
};

export default Page;
