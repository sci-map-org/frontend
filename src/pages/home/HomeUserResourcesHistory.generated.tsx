import * as Types from '../../graphql/types';

export type LastOpenedResourceCardDataFragment = { __typename?: 'UserConsumedResourceItem', consumedAt?: any | null | undefined, openedAt?: any | null | undefined, resource: { __typename?: 'Resource', _id: string, name: string, url: string, type: Types.ResourceType, rating?: number | null | undefined, durationSeconds?: number | null | undefined } };
