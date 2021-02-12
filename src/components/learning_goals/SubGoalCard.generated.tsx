import * as Types from '../../graphql/types';

import { LearningGoalLinkDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { LearningGoalCircularProgressDataFragment } from './LearningGoalCircularProgress.generated';
import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
export type ConceptSubGoalCardDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name'>
  & { domain?: Types.Maybe<(
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key' | 'name'>
  )> }
);

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
      { __typename?: 'Concept' }
      & { domain?: Types.Maybe<(
        { __typename?: 'Domain' }
        & DomainDataFragment
      )> }
      & ConceptDataFragment
    ) }
  )>> }
  & LearningGoalLinkDataFragment
  & LearningGoalCircularProgressDataFragment
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
