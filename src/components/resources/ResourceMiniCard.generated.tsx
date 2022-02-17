import * as Types from '../../graphql/types';

export type ResourceMiniCardDataFragment = { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, consumed?: { __typename?: 'ConsumedResource', consumedAt?: any | null | undefined, openedAt?: any | null | undefined } | null | undefined };
