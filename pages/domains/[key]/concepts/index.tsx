import { useRouter } from 'next/router';

import ConceptListPage from '../../../../src/pages/domains/concepts/ConceptListPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (!key || typeof key !== 'string') return null;

  return <ConceptListPage domainKey={key} />;
};

export default Page;
