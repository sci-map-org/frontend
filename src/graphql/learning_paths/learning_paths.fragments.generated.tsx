import * as Types from '../types';

export type LearningPathDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'name' | 'description'>
);
