import * as Types from '../../graphql/types';

export type ResourceMiniCardDataFragment = { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, rating?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', consumedAt?: any | null | undefined, openedAt?: any | null | undefined } | null | undefined };
