import * as Types from '../../../graphql/types';

import * as Operations from './ProgressMap';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetProgressMapTopicsQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  areaTopicTypes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type GetProgressMapTopicsQuery = { __typename?: 'Query', getTopicById: { __typename?: 'Topic', level?: number | null | undefined, subTopicsTotalCount?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', level?: number | null | undefined, subTopicsTotalCount?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string }> | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', _id: string } }> | null | undefined, followUps?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', followUpTopic: { __typename?: 'Topic', _id: string } }> | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', level?: number | null | undefined, subTopicsTotalCount?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string }> | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', _id: string } }> | null | undefined, followUps?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', followUpTopic: { __typename?: 'Topic', _id: string } }> | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', level?: number | null | undefined, subTopicsTotalCount?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string }> | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', _id: string } }> | null | undefined, followUps?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', followUpTopic: { __typename?: 'Topic', _id: string } }> | null | undefined } }> | null | undefined } }> | null | undefined } }> | null | undefined } };



/**
 * __useGetProgressMapTopicsQuery__
 *
 * To run a query within a React component, call `useGetProgressMapTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgressMapTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgressMapTopicsQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      areaTopicTypes: // value for 'areaTopicTypes'
 *   },
 * });
 */
export function useGetProgressMapTopicsQuery(baseOptions: Apollo.QueryHookOptions<GetProgressMapTopicsQuery, GetProgressMapTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProgressMapTopicsQuery, GetProgressMapTopicsQueryVariables>(Operations.getProgressMapTopics, options);
      }
export function useGetProgressMapTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgressMapTopicsQuery, GetProgressMapTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProgressMapTopicsQuery, GetProgressMapTopicsQueryVariables>(Operations.getProgressMapTopics, options);
        }
export type GetProgressMapTopicsQueryHookResult = ReturnType<typeof useGetProgressMapTopicsQuery>;
export type GetProgressMapTopicsLazyQueryHookResult = ReturnType<typeof useGetProgressMapTopicsLazyQuery>;
export type GetProgressMapTopicsQueryResult = Apollo.QueryResult<GetProgressMapTopicsQuery, GetProgressMapTopicsQueryVariables>;