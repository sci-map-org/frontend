import * as Types from '../types';

export type LearningGoalDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'name' | 'description' | 'key'>
);
