import { useRouter } from 'next/router';

import { TopicTreePage } from '../../../src/pages/topics/TopicTreePage';

const Page: React.FC = () => {
  const router = useRouter();

  const { topicKey } = router.query;
  
  if (typeof topicKey !== 'string') return null;

  return <TopicTreePage topicKey={topicKey} />;
};

export default Page;
