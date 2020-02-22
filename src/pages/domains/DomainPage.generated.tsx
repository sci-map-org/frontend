import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './DomainPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';




export type GetDomainByKeyDomainPageQueryVariables = {
  key: Types.Scalars['String']
};


export type GetDomainByKeyDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & { concepts: Types.Maybe<(
      { __typename?: 'DomainConceptsResults' }
      & { items: Array<(
        { __typename?: 'DomainConceptsItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & ConceptDataFragment
        ), relationship: (
          { __typename?: 'ConceptBelongsToDomain' }
          & Pick<Types.ConceptBelongsToDomain, 'index'>
        ) }
      )> }
    )>, resources: Types.Maybe<(
      { __typename?: 'DomainResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )> }
    & DomainDataFragment
  ) }
);



/**
 * __useGetDomainByKeyDomainPageQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyDomainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyDomainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyDomainPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyDomainPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>(Operations.getDomainByKeyDomainPage, baseOptions);
      }
export function useGetDomainByKeyDomainPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>(Operations.getDomainByKeyDomainPage, baseOptions);
        }
export type GetDomainByKeyDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyDomainPageQuery>;
export type GetDomainByKeyDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyDomainPageLazyQuery>;
export type GetDomainByKeyDomainPageQueryResult = ApolloReactCommon.QueryResult<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>;