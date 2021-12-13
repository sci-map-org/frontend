import * as Types from '../types';

export type TopicLinkDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id' | 'key' | 'name' | 'context'>
);

export type TopicFullDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id' | 'name' | 'key' | 'context' | 'isDisambiguation' | 'description' | 'createdAt'>
);
