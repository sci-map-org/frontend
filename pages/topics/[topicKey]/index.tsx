import { useRouter } from 'next/router';

import { TopicPage } from '../../../src/pages/topics/TopicPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { topicKey } = router.query;
  
  if (typeof topicKey !== 'string') return null;

  return <TopicPage topicKey={topicKey} />;
};

export default Page;
