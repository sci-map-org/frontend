import * as Types from '../../../graphql/types';

import * as Operations from './GlobalSearchBox';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GlobalSearchQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  options?: Types.InputMaybe<Types.GlobalSearchOptions>;
}>;


export type GlobalSearchQuery = { __typename?: 'Query', globalSearch: { __typename?: 'GlobalSearchResults', results: Array<{ __typename?: 'SearchResult', entity: { __typename?: 'LearningPath', durationSeconds?: number | null | undefined, rating?: number | null | undefined, _id: string, key: string, name: string, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string } }> | null | undefined } | { __typename?: 'Resource', rating?: number | null | undefined, _id: string, key: string, name: string, resourceTypes: Array<Types.ResourceType> } | { __typename?: 'Topic', isDisambiguation?: boolean | null | undefined, context?: string | null | undefined, subTopicsTotalCount?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, _id: string, key: string, name: string } }> } };



/**
 * __useGlobalSearchQuery__
 *
 * To run a query within a React component, call `useGlobalSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGlobalSearchQuery(baseOptions: Apollo.QueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(Operations.globalSearch, options);
      }
export function useGlobalSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(Operations.globalSearch, options);
        }
export type GlobalSearchQueryHookResult = ReturnType<typeof useGlobalSearchQuery>;
export type GlobalSearchLazyQueryHookResult = ReturnType<typeof useGlobalSearchLazyQuery>;
export type GlobalSearchQueryResult = Apollo.QueryResult<GlobalSearchQuery, GlobalSearchQueryVariables>;