import { useRouter } from 'next/router';

import { EditConceptPage } from '../../../../../src/pages/domains/concepts/EditConceptPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { conceptKey, key } = router.query;

  if (!conceptKey || typeof conceptKey !== 'string') return null;
  if (!key || typeof key !== 'string') return null;

  return <EditConceptPage domainKey={key} conceptKey={conceptKey} />;
};

export default Page;
