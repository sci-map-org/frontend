import { useRouter } from 'next/router';

import { AddResourceToDomainPage } from '../../../../src/pages/domains/resources/AddResourceToDomainPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  return <AddResourceToDomainPage domainKey={key} />;
};

export default Page;
