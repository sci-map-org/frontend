import { useRouter } from 'next/router';
import { TopicResourceListPage } from '../../../src/pages/topics/TopicResourceListPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { topicKey } = router.query;

  if (!topicKey || typeof topicKey !== 'string') return null;

  return <TopicResourceListPage topicKey={topicKey} />;
};

export default Page;
