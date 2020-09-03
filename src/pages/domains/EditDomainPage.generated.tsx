import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import * as Operations from './EditDomainPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetDomainByKeyEditDomainPageQueryVariables = Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyEditDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & DomainDataFragment
  ) }
);



/**
 * __useGetDomainByKeyEditDomainPageQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyEditDomainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyEditDomainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyEditDomainPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyEditDomainPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>(Operations.getDomainByKeyEditDomainPage, baseOptions);
      }
export function useGetDomainByKeyEditDomainPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>(Operations.getDomainByKeyEditDomainPage, baseOptions);
        }
export type GetDomainByKeyEditDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyEditDomainPageQuery>;
export type GetDomainByKeyEditDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyEditDomainPageLazyQuery>;
export type GetDomainByKeyEditDomainPageQueryResult = ApolloReactCommon.QueryResult<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>;