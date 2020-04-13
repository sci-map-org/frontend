import * as Types from '../../graphql/types';

import * as Operations from './ResourceTagSelector';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SearchResourceTagsQueryVariables = {
  options: Types.SearchResourceTagsOptions;
};


export type SearchResourceTagsQuery = (
  { __typename?: 'Query' }
  & { searchResourceTags: Array<(
    { __typename?: 'ResourceTagSearchResult' }
    & Pick<Types.ResourceTagSearchResult, 'name' | 'usageCount'>
  )> }
);



/**
 * __useSearchResourceTagsQuery__
 *
 * To run a query within a React component, call `useSearchResourceTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResourceTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResourceTagsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchResourceTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchResourceTagsQuery, SearchResourceTagsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchResourceTagsQuery, SearchResourceTagsQueryVariables>(Operations.searchResourceTags, baseOptions);
      }
export function useSearchResourceTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchResourceTagsQuery, SearchResourceTagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchResourceTagsQuery, SearchResourceTagsQueryVariables>(Operations.searchResourceTags, baseOptions);
        }
export type SearchResourceTagsQueryHookResult = ReturnType<typeof useSearchResourceTagsQuery>;
export type SearchResourceTagsLazyQueryHookResult = ReturnType<typeof useSearchResourceTagsLazyQuery>;
export type SearchResourceTagsQueryResult = ApolloReactCommon.QueryResult<SearchResourceTagsQuery, SearchResourceTagsQueryVariables>;