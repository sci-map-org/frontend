import { intersection } from 'lodash';
import { TopicType } from '../graphql/types';

export const AREA_TOPIC_TYPE_NAMES: string[] = ['field', 'theory', 'programming language'];

export const isTopicArea = (topicTypes: TopicType[]) =>
  intersection(
    topicTypes.map(({ name }) => name),
    AREA_TOPIC_TYPE_NAMES
  ).length >= 1;
