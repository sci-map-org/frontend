import * as Types from '../../graphql/types';

export type LearningGoalLinearProgressDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { progress?: Types.Maybe<(
    { __typename?: 'LearningGoalProgress' }
    & Pick<Types.LearningGoalProgress, 'level'>
  )> }
);
