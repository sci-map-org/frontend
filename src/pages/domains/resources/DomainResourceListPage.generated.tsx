import * as Types from '../../../graphql/types';

import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import * as Operations from './DomainResourceListPage';
import * as Apollo from '@apollo/client';
export type GetResourcesDomainResourceListPageQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
  options: Types.DomainResourcesOptions;
}>;


export type GetResourcesDomainResourceListPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & { resources?: Types.Maybe<(
      { __typename?: 'DomainResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourceDataFragment
      )> }
    )> }
    & DomainDataFragment
  ) }
);



/**
 * __useGetResourcesDomainResourceListPageQuery__
 *
 * To run a query within a React component, call `useGetResourcesDomainResourceListPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourcesDomainResourceListPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourcesDomainResourceListPageQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetResourcesDomainResourceListPageQuery(baseOptions?: Apollo.QueryHookOptions<GetResourcesDomainResourceListPageQuery, GetResourcesDomainResourceListPageQueryVariables>) {
        return Apollo.useQuery<GetResourcesDomainResourceListPageQuery, GetResourcesDomainResourceListPageQueryVariables>(Operations.getResourcesDomainResourceListPage, baseOptions);
      }
export function useGetResourcesDomainResourceListPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourcesDomainResourceListPageQuery, GetResourcesDomainResourceListPageQueryVariables>) {
          return Apollo.useLazyQuery<GetResourcesDomainResourceListPageQuery, GetResourcesDomainResourceListPageQueryVariables>(Operations.getResourcesDomainResourceListPage, baseOptions);
        }
export type GetResourcesDomainResourceListPageQueryHookResult = ReturnType<typeof useGetResourcesDomainResourceListPageQuery>;
export type GetResourcesDomainResourceListPageLazyQueryHookResult = ReturnType<typeof useGetResourcesDomainResourceListPageLazyQuery>;
export type GetResourcesDomainResourceListPageQueryResult = Apollo.QueryResult<GetResourcesDomainResourceListPageQuery, GetResourcesDomainResourceListPageQueryVariables>;