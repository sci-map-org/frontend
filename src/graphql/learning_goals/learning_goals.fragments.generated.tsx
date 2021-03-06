import * as Types from '../types';

import { DomainLinkDataFragment, DomainDataFragment } from '../domains/domains.fragments.generated';
export type LearningGoalDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'name' | 'hidden' | 'type' | 'description' | 'publishedAt'>
);

export type LearningGoalLinkDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'name' | 'type'>
  & { domain?: Types.Maybe<(
    { __typename?: 'LearningGoalBelongsToDomain' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainLinkDataFragment
    ) }
  )> }
);
