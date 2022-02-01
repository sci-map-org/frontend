import * as Types from '../../graphql/types';

export type LearningMaterialRecommendationsViewerData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, recommendationsCount?: number | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined };

export type LearningMaterialRecommendationsViewerData_Resource_Fragment = { __typename?: 'Resource', _id: string, recommendationsCount?: number | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined };

export type LearningMaterialRecommendationsViewerDataFragment = LearningMaterialRecommendationsViewerData_LearningPath_Fragment | LearningMaterialRecommendationsViewerData_Resource_Fragment;
