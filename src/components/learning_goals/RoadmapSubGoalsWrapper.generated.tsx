import * as Types from '../../graphql/types';

export type RoadmapSubGoalsWrapperDataFragment = { __typename?: 'LearningGoal', _id: string, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', strength: number, subGoal: { __typename?: 'LearningGoal' } | { __typename?: 'Topic', _id: string } }> | null | undefined };
