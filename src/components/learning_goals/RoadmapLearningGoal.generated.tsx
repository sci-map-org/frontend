import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { OtherLearnersViewerUserDataFragment } from '../lib/OtherLearnersViewer.generated';
import { RoadmapSubGoalsWrapperDataFragment } from './RoadmapSubGoalsWrapper.generated';
import { StartLearningGoalButtonDataFragment } from './StartLearningGoalButton.generated';
export type RoadmapLearningGoalDataFragment = (
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
  )> }
  & LearningGoalDataFragment
  & RoadmapSubGoalsWrapperDataFragment
  & StartLearningGoalButtonDataFragment
);
