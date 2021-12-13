import { useRouter } from 'next/router';
import { ResourceType } from '../../../src/graphql/types';
import { BestXPage } from '../../../src/pages/topics/BestXPage';

const Page: React.FC<{}> = () => {
  const router = useRouter();

  const { topicKey } = router.query;
  if (typeof topicKey !== 'string') return null;
  return <BestXPage topicKey={topicKey} x={[ResourceType.Course]} />;
};

export default Page;
