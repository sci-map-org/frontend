import * as Types from '../../graphql/types';

export type SquareResourceCardDataFragment = { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, recommendationsCount?: number | null | undefined, url: string, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined } | null | undefined };
