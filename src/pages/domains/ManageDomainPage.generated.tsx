import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import * as Operations from './ManageDomainPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetDomainByKeyManageDomainPageQueryVariables = Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyManageDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & DomainDataFragment
  ) }
);



/**
 * __useGetDomainByKeyManageDomainPageQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyManageDomainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyManageDomainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyManageDomainPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyManageDomainPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
      }
export function useGetDomainByKeyManageDomainPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
        }
export type GetDomainByKeyManageDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageQuery>;
export type GetDomainByKeyManageDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageLazyQuery>;
export type GetDomainByKeyManageDomainPageQueryResult = ApolloReactCommon.QueryResult<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>;