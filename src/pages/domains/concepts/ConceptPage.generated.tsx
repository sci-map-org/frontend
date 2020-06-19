import * as Types from '../../../graphql/types';

import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import * as Operations from './ConceptPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetConceptConceptPageQueryVariables = Exact<{
  key: Types.Scalars['String'];
}>;


export type GetConceptConceptPageQuery = (
  { __typename?: 'Query' }
  & { getConceptByKey: (
    { __typename?: 'Concept' }
    & { coveredByResources?: Types.Maybe<(
      { __typename?: 'ConceptCoveredByResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )>, domain?: Types.Maybe<(
      { __typename?: 'Domain' }
      & DomainDataFragment
    )> }
    & ConceptDataFragment
  ) }
);



/**
 * __useGetConceptConceptPageQuery__
 *
 * To run a query within a React component, call `useGetConceptConceptPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConceptConceptPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConceptConceptPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetConceptConceptPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>(Operations.getConceptConceptPage, baseOptions);
      }
export function useGetConceptConceptPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>(Operations.getConceptConceptPage, baseOptions);
        }
export type GetConceptConceptPageQueryHookResult = ReturnType<typeof useGetConceptConceptPageQuery>;
export type GetConceptConceptPageLazyQueryHookResult = ReturnType<typeof useGetConceptConceptPageLazyQuery>;
export type GetConceptConceptPageQueryResult = ApolloReactCommon.QueryResult<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>;