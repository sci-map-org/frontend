import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { UserAvatarDataFragment } from '../users/UserAvatar.generated';
import { OtherLearnersViewerUserDataFragment } from '../lib/OtherLearnersViewer.generated';
import { DomainLinkDataFragment, DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalPublishButtonDataFragment } from './LearningGoalPublishButton.generated';
import { RoadmapSubGoalsWrapperDataFragment } from './RoadmapSubGoalsWrapper.generated';
import { StartLearningGoalButtonDataFragment } from './StartLearningGoalButton.generated';
import { LearningGoalLinearProgressDataFragment } from './LearningGoalLinearProgress.generated';
export type RoadmapLearningGoalDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
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
  )>, domain?: Types.Maybe<(
    { __typename?: 'LearningGoalBelongsToDomain' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainLinkDataFragment
    ) }
  )> }
  & LearningGoalDataFragment
  & LearningGoalPublishButtonDataFragment
  & RoadmapSubGoalsWrapperDataFragment
  & StartLearningGoalButtonDataFragment
  & LearningGoalLinearProgressDataFragment
);
