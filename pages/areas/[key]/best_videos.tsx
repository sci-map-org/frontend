import { useRouter } from 'next/router';
import { ResourceType } from '../../../src/graphql/types';
import { BestXPage } from '../../../src/pages/domains/BestXPage';

const Page: React.FC<{}> = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;
  return (
    <BestXPage
      domainKey={key}
      x={[ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist, ResourceType.Talk, ResourceType.Documentary]}
    />
  );
};

export default Page;
