import { useRouter } from 'next/router';

import { ConceptPage } from '../../../../../src/pages/domains/concepts/ConceptPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key, id } = router.query;
  if (!key || typeof key !== 'string') return null;
  if (!id || typeof id !== 'string') return null;

  return <ConceptPage domainKey={key} conceptId={id} />;
};

export default Page;
