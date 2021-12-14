import * as Types from '../../graphql/types';

export type ParentLearningGoalsNavigationBlockDataFragment = { __typename?: 'LearningGoal', _id: string, requiredInGoals?: Array<{ __typename?: 'RequiredInGoalItem', strength: number, goal: { __typename?: 'LearningGoal', _id: string, key: string, name: string, type: Types.LearningGoalType } }> | null | undefined };
