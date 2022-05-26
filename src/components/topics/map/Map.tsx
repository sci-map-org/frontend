import { useCallback, useEffect, useMemo, useState } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { BaseMap } from './BaseMap';
import { MapOptions } from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapType } from './MapHeader';
import { PrerequisiteMap } from './PrerequisiteMap';
import { ProgressMap } from './ProgressMap';
import { SubTopicsMap } from './SubTopicsMap';

interface MapHistoryState {
  topic: MapTopicDataFragment;
  mapType: MapType;
}

interface MapHistory {
  current?: MapHistoryState;
  previous?: MapHistoryState;
  push: (newState: MapHistoryState) => void;
  pop: () => void;
}

// History is duplicated, not used as unique source of truth. Tried a bit to refactor that in a better way,
// but it's not obvious as state changes come from varied sources.
const useMapHistory = (): MapHistory => {
  const [topicHistory, setTopicHistory] = useState<MapHistoryState[]>([]);

  const current = useMemo(
    () => (topicHistory.length > 0 ? topicHistory[topicHistory.length - 1] : undefined),
    [topicHistory]
  );

  const previous = useMemo(
    () => (topicHistory.length > 1 ? topicHistory[topicHistory.length - 2] : undefined),
    [topicHistory]
  );

  const push = useCallback(
    (newState: MapHistoryState) => {
      setTopicHistory((h) => [...h, newState]);
    },
    [setTopicHistory]
  );

  const pop = useCallback(() => {
    setTopicHistory((h) => {
      h.pop();
      return [...h];
    });
  }, [setTopicHistory]);

  return {
    current,
    previous,
    push,
    pop,
  };
};

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
  const { current, previous, push, pop } = useMapHistory();

  const onSelectTopic = useCallback(onSelectTopicProp, [onSelectTopicProp]);

  useEffect(() => {
    // synchronizes the last fetched topic with the history, no matter how it's set
    if (!topic || isLoading || (current && topic._id === current.topic._id)) return;
    push({ topic, mapType });
  }, [topic?._id]);

  useEffect(() => {
    // synchronizes the mapType with the history
    if (!current || (current.topic._id === topic?._id && current.mapType === mapType)) return;
    push({ mapType, topic: current.topic });
  }, [mapType]);

  const onBack = useMemo(() => {
    return !!previous && !isLoading
      ? () => {
          previous.topic._id !== topic?._id && onSelectTopic(previous.topic);
          previous.mapType !== mapType && setMapType(previous.mapType);
          pop();
        }
      : undefined;
  }, [previous, isLoading]);

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
    return <PrerequisiteMap topicId={topic._id} options={options} onSelectTopic={onSelectTopic} onBack={onBack} />;
  if (mapType === MapType.CONCEPTS && topic)
    return (
      <ProgressMap
        topicId={topic._id}
        options={{ ...options, showLearningMaterialsTotalCount: true, showTotalSubTopicsCount: false }}
        onSelectTopic={(topic, nodeType) => {
          console.log(topic);
          onSelectTopic(topic);
          if (nodeType === 'concept') {
            // Will trigger to state pushes in history, but better to have this behaviour still
            setMapType(MapType.PREREQUISITES);
          }
        }}
        onBack={onBack}
      />
    );
  return null;
};
