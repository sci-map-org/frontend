import * as Types from '../../graphql/types';

export type LearningPathMiniCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'name' | 'rating'>
);
