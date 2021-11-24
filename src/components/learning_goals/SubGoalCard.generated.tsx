import * as Types from '../../graphql/types';

export type SubGoalCardDataFragment = (
  { __typename?: 'SubGoalItem' }
  & Pick<Types.SubGoalItem, 'strength'>
  & { subGoal: { __typename?: 'LearningGoal' } | (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, '_id'>
  ) }
);
