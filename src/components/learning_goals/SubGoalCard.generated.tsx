import * as Types from '../../graphql/types';

export type LearningGoalSubGoalCardDataFragment = { __typename?: 'LearningGoal', description?: string | null | undefined, _id: string, key: string, name: string, type: Types.LearningGoalType, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', strength: number, subGoal: { __typename?: 'LearningGoal', type: Types.LearningGoalType, _id: string, key: string, name: string } | { __typename?: 'Topic', _id: string } }> | null | undefined, dependsOnLearningGoals?: Array<{ __typename?: 'DependsOnGoalItem', parentLearningGoalId: string, learningGoal: { __typename?: 'LearningGoal', _id: string } }> | null | undefined, progress?: { __typename?: 'LearningGoalProgress', level: number } | null | undefined };

export type SubGoalCardDataFragment = { __typename?: 'SubGoalItem', strength: number, subGoal: { __typename?: 'LearningGoal' } | { __typename?: 'Topic', _id: string } };
