import { useCallback, useEffect, useMemo, useState } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { BaseMap } from './BaseMap';
import { MapOptions } from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapType } from './MapHeader';
import { PrerequisiteMap } from './PrerequisiteMap';
import { ProgressMap } from './ProgressMap';
import { SubTopicsMap } from './SubTopicsMap';

export interface MapProps {
  mapType: MapType;
  setMapType: (mapType: MapType) => void;
  options: MapOptions;
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  isLoading?: boolean;
}

export const Map: React.FC<MapProps> = ({
  mapType,
  setMapType,
  topic,
  subTopics,
  parentTopic,
  options,
  onSelectTopic: onSelectTopicProp,
  isLoading,
}) => {
  // last topic is the current one
  const [topicHistory, setTopicHistory] = useState<{ topic: MapTopicDataFragment; mapType: MapType }[]>([]);
  const onSelectTopic = useCallback(onSelectTopicProp, [onSelectTopicProp]);
  // const isLoading = true;
  // useEffect(() => {
  //   console.log('yo');
  //   if (!!topic && topic.subTopicsTotalCount === 0 && mapType !== MapType.PREREQUISITES) {
  //     console.log('hi');
  //     setMapType(MapType.PREREQUISITES);
  //   }
  // }, [topic?._id]);
  useEffect(() => {
    if (!topic || isLoading) return;
    if (!!topicHistory.length) {
      if (topic._id === topicHistory[topicHistory.length - 1].topic._id) {
        return;
      }
      setTopicHistory([...topicHistory, { topic, mapType }]);
    } else {
      setTopicHistory([{ topic, mapType }]);
    }
  }, [topic?._id]);

  useEffect(() => {
    if (
      topicHistory.length === 0 ||
      (topicHistory[topicHistory.length - 1].topic._id === topic?._id &&
        topicHistory[topicHistory.length - 1].mapType === mapType)
    )
      return;
    if (!!topic) {
      setTopicHistory([...topicHistory, { topic, mapType }]);
    } else {
      setTopicHistory([...topicHistory, { topic: topicHistory[topicHistory.length - 1].topic, mapType }]);
    }
  }, [mapType]);

  const onBack = useMemo(() => {
    return topicHistory.length > 1 && !isLoading //&&
      ? // (topicHistory[topicHistory.length - 2].topic._id !== topic?._id ||
        //   topicHistory[topicHistory.length - 2].mapType !== mapType)
        () => {
          const newTopicHistory = [...topicHistory];
          newTopicHistory.pop();
          const previous = newTopicHistory[newTopicHistory.length - 1];
          previous.topic._id !== topic?._id && onSelectTopic(previous.topic);
          previous.mapType !== mapType && setMapType(previous.mapType);
          setTopicHistory(newTopicHistory);
        }
      : undefined;
  }, [topicHistory, isLoading]);

  if (isLoading) return <BaseMap options={options} isLoading={isLoading} />;
  if (mapType === MapType.SUBTOPICS)
    return (
      <SubTopicsMap
        topic={topic}
        subTopics={subTopics}
        parentTopic={parentTopic}
        options={options}
        onSelectTopic={onSelectTopic}
        onBack={onBack}
      />
    );

  if (mapType === MapType.PREREQUISITES && topic)
    return (
      <PrerequisiteMap topicId={topic._id} options={options} onSelectTopic={onSelectTopic} onBack={onBack} />
      // <StatelessPrerequisiteMap
      //   topic={topic}
      //   prerequisiteTopics={[
      //     { _id: 'bla', key: 'bla', name: 'Bla 1' },
      //     { _id: 'bla2', key: 'bla2', name: 'Bla 2' },
      //     { _id: 'bla3', key: 'bla3', name: 'Bla 3' },
      //     { _id: 'bla4', key: 'bla4', name: 'Bla 4' },
      //   ]}
      //   followUpTopics={[
      //     { _id: 'bli', key: 'bli', name: 'Bli' },
      //     { _id: 'bli2', key: 'bli2', name: 'Bli 2' },
      //     { _id: 'bli3', key: 'bli3', name: 'Bli 3' },
      //     { _id: 'bli4', key: 'bli4', name: 'Bli 4' },
      //   ]}
      //   options={options}
      //   onClick={onClick}
      // />
    );
  if (mapType === MapType.CONCEPTS && topic)
    return (
      <ProgressMap
        topicId={topic._id}
        // subTopics={[
        //   { _id: 'bla', key: 'bla', name: 'Bla 1', level: 0, prerequisites: [] },
        //   { _id: 'bla2', key: 'bla2', name: 'Bla 2', level: 30, prerequisites: [{ _id: 'bla' }] },
        //   { _id: 'bla3', key: 'bla3', name: 'Bla 3', level: 5, prerequisites: [] },
        //   { _id: 'bla4', key: 'bla4', name: 'Bla 4', level: 30, prerequisites: [{ _id: 'bla2' }, { _id: 'bla3' }] },
        //   { _id: 'bla5', key: 'bla5', name: 'Bla 5', level: 30, prerequisites: [{ _id: 'bla3' }] },
        //   { _id: 'bla6', key: 'bla6', name: 'Bla 6', level: 30, prerequisites: [{ _id: 'bla2' }, { _id: 'bla4' }] },
        //   { _id: 'bla7', key: 'bla7', name: 'Bla 7', level: 100, prerequisites: [] },
        //   { _id: 'bla8', key: 'bla8', name: 'Bla 8', level: 50, prerequisites: [{ _id: 'bla3' }] },
        // ]}
        options={options}
        onSelectTopic={onSelectTopic}
        onBack={onBack}
      />
    );
  return null;
};
