import * as Types from '../../../graphql/types';

import * as Operations from './SubTopicsTree';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTopicValidContextsQueryVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  topicId: Types.Scalars['String'];
}>;


export type GetTopicValidContextsQuery = { __typename?: 'Query', getTopicValidContexts: { __typename?: 'GetTopicValidContextsResult', validContexts?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } };

export type SubTopicsTreeDataFragment = { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined };



/**
 * __useGetTopicValidContextsQuery__
 *
 * To run a query within a React component, call `useGetTopicValidContextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicValidContextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicValidContextsQuery({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetTopicValidContextsQuery(baseOptions: Apollo.QueryHookOptions<GetTopicValidContextsQuery, GetTopicValidContextsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicValidContextsQuery, GetTopicValidContextsQueryVariables>(Operations.getTopicValidContexts, options);
      }
export function useGetTopicValidContextsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicValidContextsQuery, GetTopicValidContextsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicValidContextsQuery, GetTopicValidContextsQueryVariables>(Operations.getTopicValidContexts, options);
        }
export type GetTopicValidContextsQueryHookResult = ReturnType<typeof useGetTopicValidContextsQuery>;
export type GetTopicValidContextsLazyQueryHookResult = ReturnType<typeof useGetTopicValidContextsLazyQuery>;
export type GetTopicValidContextsQueryResult = Apollo.QueryResult<GetTopicValidContextsQuery, GetTopicValidContextsQueryVariables>;