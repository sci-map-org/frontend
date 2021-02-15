import { LearningGoalLinkDataFragment } from '../../../graphql/learning_goals/learning_goals.fragments.generated';
import { LearningGoalLinearProgressDataFragment } from '../LearningGoalLinearProgress.generated';
export type LearningGoalCardDataFragment = (
  { __typename?: 'LearningGoal' }
  & LearningGoalLinkDataFragment
  & LearningGoalLinearProgressDataFragment
);
