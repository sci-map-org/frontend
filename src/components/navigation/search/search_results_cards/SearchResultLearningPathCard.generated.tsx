import * as Types from '../../../../graphql/types';

export type SearchResultLearningPathCardDataFragment = { __typename?: 'LearningPath', durationSeconds?: number | null | undefined, rating?: number | null | undefined, _id: string, key: string, name: string, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string } }> | null | undefined };
