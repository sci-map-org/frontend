import * as Types from '../../../graphql/types';

export type ResourceUrlDataFragment = { __typename?: 'Resource', _id: string, url: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, lastOpenedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined };
