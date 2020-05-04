import { useRouter } from 'next/router';

import { ConceptPage } from '../../../../../src/pages/domains/concepts/ConceptPage';

const Page: React.FC = () => {
  const router = useRouter();
  const { key, conceptKey } = router.query;

  if (!key || typeof key !== 'string') return null;
  if (!conceptKey || typeof conceptKey !== 'string') return null;

  return <ConceptPage domainKey={key} conceptKey={conceptKey} />;
};

export default Page;
