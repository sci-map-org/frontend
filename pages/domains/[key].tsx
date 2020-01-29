import { useRouter } from 'next/router';

import { DomainPage } from '../../src/pages/domains/DomainPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;
  return <DomainPage domainKey={key} />;
};

export default Page;
