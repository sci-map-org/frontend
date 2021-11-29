import * as Types from '../../graphql/types';

export type TopicSubHeaderDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id' | 'key' | 'name' | 'learningMaterialsTotalCount'>
);
