import { useRouter } from 'next/router';
import { ManageDomainPage } from '../../../src/pages/domains/ManageDomainPage';

const Page: React.FC<{}> = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;
  return <ManageDomainPage domainKey={key} />;
};

export default Page;
