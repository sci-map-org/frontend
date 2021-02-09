import * as Types from '../../graphql/types';

export type LearningGoalPublishButtonDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'name' | 'publishedAt'>
);
