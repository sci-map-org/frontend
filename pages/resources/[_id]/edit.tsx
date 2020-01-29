import { useRouter } from 'next/router';

import EditResourcePage from '../../../src/pages/resources/EditResourcePage';

const Page: React.FC = () => {
  const router = useRouter();

  const { _id } = router.query;

  if (typeof _id !== 'string') return null;

  return <EditResourcePage resourceId={_id} />;
};

export default Page;
