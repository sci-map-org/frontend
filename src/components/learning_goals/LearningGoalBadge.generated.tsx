import * as Types from '../../graphql/types';

export type LearningGoalBadgeDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'name' | 'key'>
);
