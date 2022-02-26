import * as Types from '../../graphql/types';

export type LastOpenedResourceCardDataFragment = { __typename?: 'UserConsumedResourceItem', consumedAt?: any | null | undefined, openedAt?: any | null | undefined, resource: { __typename?: 'Resource', url: string, types: Array<Types.ResourceType>, rating?: number | null | undefined, durationSeconds?: number | null | undefined, recommendationsCount?: number | null | undefined, _id: string, key: string, name: string } };
