import * as Types from '../../graphql/types';

export type LearningGoalCircularProgressDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'progress'>
);
