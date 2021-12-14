import * as Types from '../../graphql/types';

import * as Operations from './TopicTreePage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTopicByKeyTopicTreePageQueryVariables = Types.Exact<{
  topicKey: Types.Scalars['String'];
}>;


export type GetTopicByKeyTopicTreePageQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined } };



/**
 * __useGetTopicByKeyTopicTreePageQuery__
 *
 * To run a query within a React component, call `useGetTopicByKeyTopicTreePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByKeyTopicTreePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByKeyTopicTreePageQuery({
 *   variables: {
 *      topicKey: // value for 'topicKey'
 *   },
 * });
 */
export function useGetTopicByKeyTopicTreePageQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByKeyTopicTreePageQuery, GetTopicByKeyTopicTreePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicByKeyTopicTreePageQuery, GetTopicByKeyTopicTreePageQueryVariables>(Operations.getTopicByKeyTopicTreePage, options);
      }
export function useGetTopicByKeyTopicTreePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByKeyTopicTreePageQuery, GetTopicByKeyTopicTreePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicByKeyTopicTreePageQuery, GetTopicByKeyTopicTreePageQueryVariables>(Operations.getTopicByKeyTopicTreePage, options);
        }
export type GetTopicByKeyTopicTreePageQueryHookResult = ReturnType<typeof useGetTopicByKeyTopicTreePageQuery>;
export type GetTopicByKeyTopicTreePageLazyQueryHookResult = ReturnType<typeof useGetTopicByKeyTopicTreePageLazyQuery>;
export type GetTopicByKeyTopicTreePageQueryResult = Apollo.QueryResult<GetTopicByKeyTopicTreePageQuery, GetTopicByKeyTopicTreePageQueryVariables>;