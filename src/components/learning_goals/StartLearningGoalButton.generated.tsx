import * as Types from '../../graphql/types';

export type StartLearningGoalButtonDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { started?: Types.Maybe<(
    { __typename?: 'LearningGoalStarted' }
    & Pick<Types.LearningGoalStarted, 'startedAt'>
  )> }
);
