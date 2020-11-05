import * as Types from '../../graphql/types';

import * as Operations from './NewResourcePage';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyTestQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyTestQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, 'name'>
    & { concepts?: Types.Maybe<(
      { __typename?: 'DomainConceptsResults' }
      & { items: Array<(
        { __typename?: 'DomainConceptsItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, 'name'>
        ) }
      )> }
    )> }
  ) }
);



/**
 * __useGetDomainByKeyTestQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyTestQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyTestQuery(baseOptions?: Apollo.QueryHookOptions<GetDomainByKeyTestQuery, GetDomainByKeyTestQueryVariables>) {
        return Apollo.useQuery<GetDomainByKeyTestQuery, GetDomainByKeyTestQueryVariables>(Operations.getDomainByKeyTest, baseOptions);
      }
export function useGetDomainByKeyTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainByKeyTestQuery, GetDomainByKeyTestQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainByKeyTestQuery, GetDomainByKeyTestQueryVariables>(Operations.getDomainByKeyTest, baseOptions);
        }
export type GetDomainByKeyTestQueryHookResult = ReturnType<typeof useGetDomainByKeyTestQuery>;
export type GetDomainByKeyTestLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyTestLazyQuery>;
export type GetDomainByKeyTestQueryResult = Apollo.QueryResult<GetDomainByKeyTestQuery, GetDomainByKeyTestQueryVariables>;