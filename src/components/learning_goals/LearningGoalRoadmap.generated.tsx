import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { UserAvatarDataFragment } from '../users/UserAvatar.generated';
import { OtherLearnersViewerUserDataFragment } from '../lib/OtherLearnersViewer.generated';
import { LearningGoalPublishButtonDataFragment } from './LearningGoalPublishButton.generated';
import { RoadmapSubGoalsWrapperDataFragment } from './RoadmapSubGoalsWrapper.generated';
import { StartLearningGoalButtonDataFragment } from './StartLearningGoalButton.generated';
import { LearningGoalLinearProgressDataFragment } from './LearningGoalLinearProgress.generated';
import { ParentLearningGoalsNavigationBlockDataFragment } from './ParentLearningGoalsNavigationBlock.generated';
export type LearningGoalRoadmapDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'rating'>
  & { createdBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserAvatarDataFragment
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
  & LearningGoalPublishButtonDataFragment
  & RoadmapSubGoalsWrapperDataFragment
  & StartLearningGoalButtonDataFragment
  & LearningGoalLinearProgressDataFragment
  & ParentLearningGoalsNavigationBlockDataFragment
);
