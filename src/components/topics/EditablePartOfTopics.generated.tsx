import * as Types from '../../graphql/types';

export type EditablePartOfTopicsDataFragment = { __typename?: 'Topic', _id: string, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined };
