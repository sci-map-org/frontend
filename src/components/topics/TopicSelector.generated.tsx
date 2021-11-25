import * as Types from '../../graphql/types';

import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import * as Operations from './TopicSelector';
import * as Apollo from '@apollo/client';
export type SearchTopicsQueryVariables = Types.Exact<{
  options: Types.SearchTopicsOptions;
}>;


export type SearchTopicsQuery = (
  { __typename?: 'Query' }
  & { searchTopics: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & TopicLinkDataFragment
    )> }
  ) }
);

export type SearchSubTopicsQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  options: Types.SearchTopicsOptions;
}>;


export type SearchSubTopicsQuery = (
  { __typename?: 'Query' }
  & { searchSubTopics: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & TopicLinkDataFragment
    )> }
  ) }
);



/**
 * __useSearchTopicsQuery__
 *
 * To run a query within a React component, call `useSearchTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTopicsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchTopicsQuery(baseOptions: Apollo.QueryHookOptions<SearchTopicsQuery, SearchTopicsQueryVariables>) {
        return Apollo.useQuery<SearchTopicsQuery, SearchTopicsQueryVariables>(Operations.searchTopics, baseOptions);
      }
export function useSearchTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTopicsQuery, SearchTopicsQueryVariables>) {
          return Apollo.useLazyQuery<SearchTopicsQuery, SearchTopicsQueryVariables>(Operations.searchTopics, baseOptions);
        }
export type SearchTopicsQueryHookResult = ReturnType<typeof useSearchTopicsQuery>;
export type SearchTopicsLazyQueryHookResult = ReturnType<typeof useSearchTopicsLazyQuery>;
export type SearchTopicsQueryResult = Apollo.QueryResult<SearchTopicsQuery, SearchTopicsQueryVariables>;

/**
 * __useSearchSubTopicsQuery__
 *
 * To run a query within a React component, call `useSearchSubTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSubTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSubTopicsQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchSubTopicsQuery(baseOptions: Apollo.QueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
        return Apollo.useQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, baseOptions);
      }
export function useSearchSubTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
          return Apollo.useLazyQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, baseOptions);
        }
export type SearchSubTopicsQueryHookResult = ReturnType<typeof useSearchSubTopicsQuery>;
export type SearchSubTopicsLazyQueryHookResult = ReturnType<typeof useSearchSubTopicsLazyQuery>;
export type SearchSubTopicsQueryResult = Apollo.QueryResult<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>;