import * as Types from '../graphql/types';

import * as Operations from './ExplorePage';
import * as Apollo from '@apollo/client';
export type GetTopLevelDomainsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTopLevelDomainsQuery = (
  { __typename?: 'Query' }
  & { getTopLevelDomains: (
    { __typename?: 'GetTopLevelDomainsResults' }
    & { items: Array<(
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id' | 'name' | 'size'>
    )> }
  ) }
);



/**
 * __useGetTopLevelDomainsQuery__
 *
 * To run a query within a React component, call `useGetTopLevelDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopLevelDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopLevelDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopLevelDomainsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>) {
        return Apollo.useQuery<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>(Operations.getTopLevelDomains, baseOptions);
      }
export function useGetTopLevelDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>) {
          return Apollo.useLazyQuery<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>(Operations.getTopLevelDomains, baseOptions);
        }
export type GetTopLevelDomainsQueryHookResult = ReturnType<typeof useGetTopLevelDomainsQuery>;
export type GetTopLevelDomainsLazyQueryHookResult = ReturnType<typeof useGetTopLevelDomainsLazyQuery>;
export type GetTopLevelDomainsQueryResult = Apollo.QueryResult<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>;