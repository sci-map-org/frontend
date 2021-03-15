import * as Types from '../../../graphql/types';

import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment, DomainLinkDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import * as Operations from './EditConceptPage';
import * as Apollo from '@apollo/client';
export type GetConceptEditConceptPageQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
  conceptKey: Types.Scalars['String'];
}>;


export type GetConceptEditConceptPageQuery = (
  { __typename?: 'Query' }
  & { getDomainConceptByKey: (
    { __typename?: 'Concept' }
    & { domain?: Types.Maybe<(
      { __typename?: 'Domain' }
      & DomainDataFragment
    )> }
    & ConceptDataFragment
  ) }
);



/**
 * __useGetConceptEditConceptPageQuery__
 *
 * To run a query within a React component, call `useGetConceptEditConceptPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConceptEditConceptPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConceptEditConceptPageQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      conceptKey: // value for 'conceptKey'
 *   },
 * });
 */
export function useGetConceptEditConceptPageQuery(baseOptions: Apollo.QueryHookOptions<GetConceptEditConceptPageQuery, GetConceptEditConceptPageQueryVariables>) {
        return Apollo.useQuery<GetConceptEditConceptPageQuery, GetConceptEditConceptPageQueryVariables>(Operations.getConceptEditConceptPage, baseOptions);
      }
export function useGetConceptEditConceptPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConceptEditConceptPageQuery, GetConceptEditConceptPageQueryVariables>) {
          return Apollo.useLazyQuery<GetConceptEditConceptPageQuery, GetConceptEditConceptPageQueryVariables>(Operations.getConceptEditConceptPage, baseOptions);
        }
export type GetConceptEditConceptPageQueryHookResult = ReturnType<typeof useGetConceptEditConceptPageQuery>;
export type GetConceptEditConceptPageLazyQueryHookResult = ReturnType<typeof useGetConceptEditConceptPageLazyQuery>;
export type GetConceptEditConceptPageQueryResult = Apollo.QueryResult<GetConceptEditConceptPageQuery, GetConceptEditConceptPageQueryVariables>;