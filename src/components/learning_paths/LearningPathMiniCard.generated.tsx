import * as Types from '../../graphql/types';

export type LearningPathMiniCardDataFragment = { __typename?: 'LearningPath', _id: string, key: string, name: string, recommendationsCount?: number | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined };
