import * as Types from '../../graphql/types';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './DomainRecommendedResources';
import * as Apollo from '@apollo/client';
export type GetDomainRecommendedResourcesQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  resourcesOptions: Types.DomainResourcesOptions;
}>;


export type GetDomainRecommendedResourcesQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & { resources?: Types.Maybe<(
      { __typename?: 'DomainResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useGetDomainRecommendedResourcesQuery__
 *
 * To run a query within a React component, call `useGetDomainRecommendedResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainRecommendedResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainRecommendedResourcesQuery({
 *   variables: {
 *      key: // value for 'key'
 *      resourcesOptions: // value for 'resourcesOptions'
 *   },
 * });
 */
export function useGetDomainRecommendedResourcesQuery(baseOptions: Apollo.QueryHookOptions<GetDomainRecommendedResourcesQuery, GetDomainRecommendedResourcesQueryVariables>) {
        return Apollo.useQuery<GetDomainRecommendedResourcesQuery, GetDomainRecommendedResourcesQueryVariables>(Operations.getDomainRecommendedResources, baseOptions);
      }
export function useGetDomainRecommendedResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainRecommendedResourcesQuery, GetDomainRecommendedResourcesQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainRecommendedResourcesQuery, GetDomainRecommendedResourcesQueryVariables>(Operations.getDomainRecommendedResources, baseOptions);
        }
export type GetDomainRecommendedResourcesQueryHookResult = ReturnType<typeof useGetDomainRecommendedResourcesQuery>;
export type GetDomainRecommendedResourcesLazyQueryHookResult = ReturnType<typeof useGetDomainRecommendedResourcesLazyQuery>;
export type GetDomainRecommendedResourcesQueryResult = Apollo.QueryResult<GetDomainRecommendedResourcesQuery, GetDomainRecommendedResourcesQueryVariables>;