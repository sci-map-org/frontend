import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { OtherLearnersViewerUserDataFragment } from '../lib/OtherLearnersViewer.generated';
import { ConceptBadgeDataFragment } from '../concepts/ConceptBadge.generated';
import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';
import { StartLearningGoalButtonDataFragment } from './StartLearningGoalButton.generated';
import { LearningGoalPublishButtonDataFragment } from './LearningGoalPublishButton.generated';
import { ParentLearningGoalsNavigationBlockDataFragment } from './ParentLearningGoalsNavigationBlock.generated';
import { LearningGoalRelevantLearningMaterialsDataFragment } from './LearningGoalRelevantLearningMaterials.generated';
export type ConceptGroupLearningGoalDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { createdBy?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, '_id'>
  )>, startedBy?: Types.Maybe<(
    { __typename?: 'LearningGoalStartedByResults' }
    & Pick<Types.LearningGoalStartedByResults, 'count'>
    & { items: Array<(
      { __typename?: 'LearningGoalStartedByItem' }
      & { user: (
        { __typename?: 'User' }
        & OtherLearnersViewerUserDataFragment
      ) }
    )> }
  )>, requiredSubGoals?: Types.Maybe<Array<(
    { __typename?: 'SubGoalItem' }
    & { subGoal: (
      { __typename?: 'LearningGoal' }
      & LearningGoalBadgeDataFragment
    ) | (
      { __typename?: 'Concept' }
      & ConceptBadgeDataFragment
    ) }
  )>> }
  & LearningGoalDataFragment
  & StartLearningGoalButtonDataFragment
  & LearningGoalPublishButtonDataFragment
  & ParentLearningGoalsNavigationBlockDataFragment
  & LearningGoalRelevantLearningMaterialsDataFragment
);
