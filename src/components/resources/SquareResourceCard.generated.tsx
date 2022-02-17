import * as Types from '../../graphql/types';

export type SquareResourceCardDataFragment = { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, rating?: number | null | undefined, url: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined } | null | undefined };
