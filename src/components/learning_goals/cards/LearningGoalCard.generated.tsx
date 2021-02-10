import * as Types from '../../../graphql/types';

import { DomainLinkDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { LearningGoalLinearProgressDataFragment } from '../LearningGoalLinearProgress.generated';
export type LearningGoalCardDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'name'>
  & { domain?: Types.Maybe<(
    { __typename?: 'LearningGoalBelongsToDomain' }
    & Pick<Types.LearningGoalBelongsToDomain, 'contextualKey' | 'contextualName'>
    & { domain: (
      { __typename?: 'Domain' }
      & DomainLinkDataFragment
    ) }
  )> }
  & LearningGoalLinearProgressDataFragment
);
