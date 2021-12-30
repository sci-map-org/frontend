import * as Types from '../../../graphql/types';

export type SubTopicsTreeDataFragment = { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', _id: string } }> | null | undefined } }> | null | undefined } }> | null | undefined };
