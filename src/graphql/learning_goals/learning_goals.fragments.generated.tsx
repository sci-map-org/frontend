import * as Types from '../types';

export type LearningGoalDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'name' | 'hidden' | 'type' | 'description' | 'publishedAt'>
);

export type LearningGoalLinkDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'name' | 'type'>
);
