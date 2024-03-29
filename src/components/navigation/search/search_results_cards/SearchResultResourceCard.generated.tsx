import * as Types from '../../../../graphql/types';

export type SearchResultResourceCardDataFragment = { __typename?: 'Resource', rating?: number | null | undefined, recommendationsCount?: number | null | undefined, _id: string, key: string, name: string, resourceTypes: Array<Types.ResourceType> };
