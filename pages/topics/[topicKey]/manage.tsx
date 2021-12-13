import { useRouter } from 'next/router';

import { ManageTopicPage } from '../../../src/pages/topics/ManageTopicPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { topicKey } = router.query;
  
  if (typeof topicKey !== 'string') return null;

  return <ManageTopicPage topicKey={topicKey} />;
};

export default Page;
