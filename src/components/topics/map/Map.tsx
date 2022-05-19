import { useCallback, useEffect, useState } from 'react';
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
  options: MapOptions;
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  isLoading?: boolean;
}

export const Map: React.FC<MapProps> = ({
  mapType,
  topic,
  subTopics,
  parentTopic,
  options,
  onSelectTopic,
  isLoading,
}) => {
  const [topicHistory, setTopicHistory] = useState<MapTopicDataFragment[]>([]);

  useEffect(() => {
    if (!!topic && !topicHistory.length) setTopicHistory([topic]);
  }, [topic]);
  const onSelect = useCallback(
    (topic: MapTopicDataFragment) => {
      console.log(`move to`);
      console.log(topicHistory);
      setTopicHistory([...topicHistory, topic]);
      onSelectTopic(topic);
    },
    [topicHistory, onSelectTopic]
  );

  const onBack =
    topicHistory.length > 1
      ? () => {
          console.log({ topicHistory });
          const newTopicHistory = [...topicHistory];
          const topic = newTopicHistory.pop();
          if (!topic) throw new Error('No history to back to');
          setTopicHistory(newTopicHistory);
          console.log('select' + topic.name);
          onSelectTopic(newTopicHistory[newTopicHistory.length - 1]);
        }
      : undefined;

  if (isLoading) return <BaseMap options={options} isLoading={isLoading} />;
  if (mapType === MapType.SUBTOPICS)
    return (
      <SubTopicsMap
        topic={topic}
        subTopics={subTopics}
        parentTopic={parentTopic}
        options={options}
        onSelectTopic={onSelect}
        onBack={onBack}
      />
    );

  if (mapType === MapType.PREREQUISITES && topic)
    return (
      <PrerequisiteMap topicId={topic._id} options={options} onSelectTopic={onSelect} onBack={onBack} />
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
        onSelectTopic={onSelect}
        onBack={onBack}
      />
    );
  return null;
};
