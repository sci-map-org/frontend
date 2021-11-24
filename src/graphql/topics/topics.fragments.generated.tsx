import * as Types from '../types';

export type TopicLinkDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id' | 'key' | 'name'>
);
