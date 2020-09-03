import { useRouter } from 'next/router';
import { EditDomainPage } from '../../../src/pages/domains/EditDomainPage';

const Page: React.FC<{}> = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;
  return <EditDomainPage domainKey={key} />;
};

export default Page;
