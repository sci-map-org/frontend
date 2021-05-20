import { Center } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { PageLayout } from '../components/layout/PageLayout';
import { ExploreMap, rootTopic } from '../components/topics/ExploreMap';

const pxWidth = 500;
const pxHeight = 500;

export const ExplorePage: React.FC<{}> = () => {
  const router = useRouter();
  const urlSelectedTopicId = router.query.selectedTopicId;
  if (urlSelectedTopicId && typeof urlSelectedTopicId !== 'string')
    throw new Error(`Invalid url param urlSelectedTopicId ${urlSelectedTopicId}`);

  return (
    <PageLayout marginSize="md">
      <Center>
        <ExploreMap
          pxWidth={pxWidth}
          mapPxHeight={pxHeight}
          selectedTopicId={urlSelectedTopicId}
          onTopicChange={(topicId) =>
            router.push(
              {
                pathname: '/explore',
                query: {
                  ...(topicId !== rootTopic._id && { selectedTopicId: topicId }),
                },
              },
              undefined,
              { shallow: true }
            )
          }
        />
      </Center>
    </PageLayout>
  );
};
