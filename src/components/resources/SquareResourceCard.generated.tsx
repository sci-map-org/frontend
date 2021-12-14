import * as Types from '../../graphql/types';

export type SquareResourceCardDataFragment = { __typename?: 'Resource', _id: string, name: string, type: Types.ResourceType, rating?: number | null | undefined, url: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined } | null | undefined };
