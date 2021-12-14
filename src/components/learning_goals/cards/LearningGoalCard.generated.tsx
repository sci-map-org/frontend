import * as Types from '../../../graphql/types';

export type LearningGoalCardDataFragment = { __typename?: 'LearningGoal', type: Types.LearningGoalType, _id: string, key: string, name: string, progress?: { __typename?: 'LearningGoalProgress', level: number } | null | undefined };
