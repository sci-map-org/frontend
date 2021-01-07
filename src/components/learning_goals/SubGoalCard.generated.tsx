import * as Types from '../../graphql/types';

import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
export type ConceptSubGoalCardDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name'>
  & { domain?: Types.Maybe<(
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key'>
  )> }
);

export type LearningGoalSubGoalCardDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'name' | 'key' | 'description'>
  & { requiredSubGoals?: Types.Maybe<Array<(
    { __typename?: 'SubGoalItem' }
    & Pick<Types.SubGoalItem, 'strength'>
    & { subGoal: (
      { __typename?: 'LearningGoal' }
      & LearningGoalBadgeDataFragment
    ) | (
      { __typename?: 'Concept' }
      & { domain?: Types.Maybe<(
        { __typename?: 'Domain' }
        & DomainDataFragment
      )> }
      & ConceptDataFragment
    ) }
  )>> }
);

export type SubGoalCardDataFragment = (
  { __typename?: 'SubGoalItem' }
  & Pick<Types.SubGoalItem, 'strength'>
  & { subGoal: (
    { __typename?: 'LearningGoal' }
    & LearningGoalSubGoalCardDataFragment
  ) | (
    { __typename?: 'Concept' }
    & ConceptSubGoalCardDataFragment
  ) }
);
