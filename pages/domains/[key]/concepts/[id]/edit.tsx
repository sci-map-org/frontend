import { useRouter } from 'next/router';

import { EditConceptPage } from '../../../../../src/components/pages/domains/concepts/EditConceptPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { id, key } = router.query;

  if (!id || typeof id !== 'string') return null;
  if (!key || typeof key !== 'string') return null;

  return <EditConceptPage domainKey={key} conceptId={id} />;
};

export default Page;
