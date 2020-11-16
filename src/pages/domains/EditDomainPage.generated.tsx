import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import * as Operations from './EditDomainPage';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyEditDomainPageQueryVariables = Types.Exact<{
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
export function useGetDomainByKeyEditDomainPageQuery(baseOptions: Apollo.QueryHookOptions<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>) {
        return Apollo.useQuery<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>(Operations.getDomainByKeyEditDomainPage, baseOptions);
      }
export function useGetDomainByKeyEditDomainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>(Operations.getDomainByKeyEditDomainPage, baseOptions);
        }
export type GetDomainByKeyEditDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyEditDomainPageQuery>;
export type GetDomainByKeyEditDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyEditDomainPageLazyQuery>;
export type GetDomainByKeyEditDomainPageQueryResult = Apollo.QueryResult<GetDomainByKeyEditDomainPageQuery, GetDomainByKeyEditDomainPageQueryVariables>;