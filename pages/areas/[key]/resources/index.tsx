import { useRouter } from 'next/router';
import { DomainResourceListPage } from '../../../../src/pages/domains/resources/DomainResourceListPage';

const ResourceListPage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (!key || typeof key !== 'string') return null;
  return <DomainResourceListPage domainKey={key} />;
};

export default ResourceListPage;
