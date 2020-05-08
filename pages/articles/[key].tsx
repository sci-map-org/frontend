import { useRouter } from 'next/router';

import { ArticlePage } from '../../src/pages/articles/ArticlePage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  return <ArticlePage articleKey={key} />;
};

export default Page;
