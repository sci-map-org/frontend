import * as Types from '../../graphql/types';

export type TopicBadgeDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id' | 'key' | 'name'>
);
