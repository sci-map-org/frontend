import * as Types from '../../../graphql/types';

import * as Operations from './TopicTypeField';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchTopicTypesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type SearchTopicTypesQuery = { __typename?: 'Query', searchTopicTypes: Array<{ __typename?: 'TopicType', name: string, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> };



/**
 * __useSearchTopicTypesQuery__
 *
 * To run a query within a React component, call `useSearchTopicTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTopicTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTopicTypesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchTopicTypesQuery(baseOptions: Apollo.QueryHookOptions<SearchTopicTypesQuery, SearchTopicTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTopicTypesQuery, SearchTopicTypesQueryVariables>(Operations.searchTopicTypes, options);
      }
export function useSearchTopicTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTopicTypesQuery, SearchTopicTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTopicTypesQuery, SearchTopicTypesQueryVariables>(Operations.searchTopicTypes, options);
        }
export type SearchTopicTypesQueryHookResult = ReturnType<typeof useSearchTopicTypesQuery>;
export type SearchTopicTypesLazyQueryHookResult = ReturnType<typeof useSearchTopicTypesLazyQuery>;
export type SearchTopicTypesQueryResult = Apollo.QueryResult<SearchTopicTypesQuery, SearchTopicTypesQueryVariables>;