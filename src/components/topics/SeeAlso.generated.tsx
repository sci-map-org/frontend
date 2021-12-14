import * as Types from '../../graphql/types';

export type SeeAlsoDataFragment = { __typename?: 'Topic', _id: string, disambiguationTopic?: { __typename?: 'Topic', contextualisedTopics?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } | null | undefined };
