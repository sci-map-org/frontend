import * as Types from '../../graphql/types';

export type LearningMaterialMiniCardData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, name: string, recommendationsCount?: number | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined };

export type LearningMaterialMiniCardData_Resource_Fragment = { __typename?: 'Resource', _id: string, name: string, recommendationsCount?: number | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined };

export type LearningMaterialMiniCardDataFragment = LearningMaterialMiniCardData_LearningPath_Fragment | LearningMaterialMiniCardData_Resource_Fragment;
