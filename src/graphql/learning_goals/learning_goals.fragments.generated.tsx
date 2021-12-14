import * as Types from '../types';

export type LearningGoalDataFragment = { __typename?: 'LearningGoal', _id: string, key: string, name: string, hidden: boolean, type: Types.LearningGoalType, description?: string | null | undefined, publishedAt?: any | null | undefined };

export type LearningGoalLinkDataFragment = { __typename?: 'LearningGoal', _id: string, key: string, name: string, type: Types.LearningGoalType };
