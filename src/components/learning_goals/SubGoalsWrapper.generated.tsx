import * as Types from '../../graphql/types';

import { SubGoalCardDataFragment } from './SubGoalCard.generated';
export type SubGoalsWrapperDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { requiredSubGoals?: Types.Maybe<Array<(
    { __typename?: 'SubGoalItem' }
    & SubGoalCardDataFragment
  )>> }
);
