import * as Types from '../../../graphql/types';

import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import * as Operations from './EditResourcePage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type GetResourceEditResourcePageQueryVariables = {
  id: Types.Scalars['String']
};


export type GetResourceEditResourcePageQuery = (
  { __typename?: 'Query' }
  & { getResourceById: (
    { __typename?: 'Resource' }
    & { coveredConcepts: Types.Maybe<(
      { __typename?: 'ResourceCoveredConceptsResults' }
      & { items: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
        & { domain: Types.Maybe<(
          { __typename?: 'Domain' }
          & Pick<Types.Domain, '_id' | 'key' | 'name'>
        )> }
      )> }
    )>, domains: Types.Maybe<(
      { __typename?: 'ResourceDomainsResults' }
      & { items: Array<(
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key' | 'name'>
        & { concepts: Types.Maybe<(
          { __typename?: 'DomainConceptsResults' }
          & { items: Array<(
            { __typename?: 'Concept' }
            & Pick<Types.Concept, '_id' | 'name'>
          )> }
        )> }
      )> }
    )> }
    & ResourceDataFragment
  ) }
);



/**
 * __useGetResourceEditResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceEditResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceEditResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceEditResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceEditResourcePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, baseOptions);
      }
export function useGetResourceEditResourcePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, baseOptions);
        }
export type GetResourceEditResourcePageQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageQuery>;
export type GetResourceEditResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageLazyQuery>;
export type GetResourceEditResourcePageQueryResult = ApolloReactCommon.QueryResult<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>;