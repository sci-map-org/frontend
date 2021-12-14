import * as Types from '../../graphql/types';

export type ParentTopicsBreadcrumbsDataFragment = { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } | null | undefined };
