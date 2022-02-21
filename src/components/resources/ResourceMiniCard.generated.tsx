import * as Types from '../../graphql/types';

export type ResourceMiniCardDataFragment = { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, recommendationsCount?: number | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined };
