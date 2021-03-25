import { useRouter } from 'next/router';

import { NewConceptPage } from '../../../../src/pages/domains/concepts/NewConceptPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;
  return <NewConceptPage domainKey={key} />;
};

export default Page;
