import * as Types from '../../../../graphql/types';

import { LearningGoalLinkDataFragment } from '../../../../graphql/learning_goals/learning_goals.fragments.generated';
export type SearchResultLearningGoalCardDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, 'type'>
  & LearningGoalLinkDataFragment
);
