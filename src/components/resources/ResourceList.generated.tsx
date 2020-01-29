import * as Types from '../../graphql/types';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './ResourceList';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type ListDomainResourcePreviewsQueryVariables = {
  domainKey: Types.Scalars['String'],
  options: Types.DomainResourcesOptions
};


export type ListDomainResourcePreviewsQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'name'>
    & { resources: Types.Maybe<(
      { __typename?: 'DomainResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useListDomainResourcePreviewsQuery__
 *
 * To run a query within a React component, call `useListDomainResourcePreviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDomainResourcePreviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDomainResourcePreviewsQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useListDomainResourcePreviewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListDomainResourcePreviewsQuery, ListDomainResourcePreviewsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListDomainResourcePreviewsQuery, ListDomainResourcePreviewsQueryVariables>(Operations.listDomainResourcePreviews, baseOptions);
      }
export function useListDomainResourcePreviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListDomainResourcePreviewsQuery, ListDomainResourcePreviewsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListDomainResourcePreviewsQuery, ListDomainResourcePreviewsQueryVariables>(Operations.listDomainResourcePreviews, baseOptions);
        }
export type ListDomainResourcePreviewsQueryHookResult = ReturnType<typeof useListDomainResourcePreviewsQuery>;
export type ListDomainResourcePreviewsLazyQueryHookResult = ReturnType<typeof useListDomainResourcePreviewsLazyQuery>;
export type ListDomainResourcePreviewsQueryResult = ApolloReactCommon.QueryResult<ListDomainResourcePreviewsQuery, ListDomainResourcePreviewsQueryVariables>;