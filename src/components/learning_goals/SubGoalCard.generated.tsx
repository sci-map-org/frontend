import * as Types from '../../graphql/types';

import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { LearningGoalCircularProgressDataFragment } from './LearningGoalCircularProgress.generated';
import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';
export type LearningGoalSubGoalCardDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, 'description'>
  & { requiredSubGoals?: Types.Maybe<Array<(
    { __typename?: 'SubGoalItem' }
    & Pick<Types.SubGoalItem, 'strength'>
    & { subGoal: (
      { __typename?: 'LearningGoal' }
      & LearningGoalBadgeDataFragment
    ) | (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
    ) }
  )>>, dependsOnLearningGoals?: Types.Maybe<Array<(
    { __typename?: 'DependsOnGoalItem' }
    & Pick<Types.DependsOnGoalItem, 'parentLearningGoalId'>
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
    ) }
  )>> }
  & LearningGoalLinkDataFragment
  & LearningGoalCircularProgressDataFragment
);

export type SubGoalCardDataFragment = (
  { __typename?: 'SubGoalItem' }
  & Pick<Types.SubGoalItem, 'strength'>
  & { subGoal: { __typename?: 'LearningGoal' } | (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, '_id'>
  ) }
);
