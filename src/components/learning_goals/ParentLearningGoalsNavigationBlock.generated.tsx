import * as Types from '../../graphql/types';

import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
export type ParentLearningGoalsNavigationBlockDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { requiredInGoals?: Types.Maybe<Array<(
    { __typename?: 'RequiredInGoalItem' }
    & Pick<Types.RequiredInGoalItem, 'strength'>
    & { goal: (
      { __typename?: 'LearningGoal' }
      & LearningGoalLinkDataFragment
    ) }
  )>> }
);
