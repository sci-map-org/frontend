import { Center } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ExploreMapProps, rootTopic } from '../components/topics/map/ExploreMap';
import { MapType } from '../components/topics/map/MapHeader';
import { useElementSize } from '../util/useElementSize';

const ExploreMap = dynamic<ExploreMapProps>(
  () =>
    import('../components/topics/map/ExploreMap').then((res) => {
      const { ExploreMap } = res;
      return ExploreMap;
    }),
  { ssr: false }
);

const pxHeight = 500;

export const ExplorePage: React.FC<{}> = () => {
  const router = useRouter();
  const urlSelectedTopicId = router.query.selectedTopicId;
  if (urlSelectedTopicId && typeof urlSelectedTopicId !== 'string')
    throw new Error(`Invalid url param urlSelectedTopicId ${urlSelectedTopicId}`);

  const urlSelectedMapType = router.query.mapType;
  if (urlSelectedMapType && typeof urlSelectedMapType !== 'string')
    throw new Error(`Invalid url param mapType ${urlSelectedMapType}`);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useElementSize(containerRef);
  const pxWidth = useBreakpointValue<number>({ base: containerSize?.width || 300, sm: 500, md: 700, lg: 900 }) || 400;
  return (
    <PageLayout marginSize="md">
      <Center ref={containerRef} p={1}>
        <ExploreMap
          options={{ direction: 'column', mapPxHeight: (pxWidth * 3) / 5, mapPxWidth: pxWidth }}
          selectedTopicId={urlSelectedTopicId}
          selectedMapType={urlSelectedMapType as MapType}
          onTopicOrMapTypeChange={(topicId, mapType) =>
            router.push(
              {
                pathname: '/explore',
                query: {
                  ...(topicId !== rootTopic._id && { selectedTopicId: topicId }),
                  mapType,
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
