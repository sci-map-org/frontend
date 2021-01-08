import * as Types from '../../graphql/types';

export type LearningGoalBadgeDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'name' | 'key'>
  & { domain?: Types.Maybe<(
    { __typename?: 'LearningGoalBelongsToDomain' }
    & Pick<Types.LearningGoalBelongsToDomain, 'contextualKey' | 'contextualName'>
    & { domain: (
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id' | 'key'>
    ) }
  )> }
);
