import { useRouter } from 'next/router';

import EditResourcePage from '../../../src/pages/resources/EditResourcePage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') return null;

  return <EditResourcePage resourceKey={key} />;
};

export default Page;
