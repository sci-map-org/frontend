import * as Types from '../../graphql/types';

import * as Operations from './ResourcePage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetResourceResourcePageQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourceResourcePageQuery = { __typename?: 'Query', getResourceById: { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, mediaType: Types.ResourceMediaType, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, rating?: number | null | undefined, url: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined } | null | undefined }> | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, mediaType: Types.ResourceMediaType, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined }> | null | undefined, parentResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, seriesParentResource?: { __typename?: 'Resource', _id: string, name: string } | null | undefined, previousResource?: { __typename?: 'Resource', _id: string, name: string } | null | undefined, nextResource?: { __typename?: 'Resource', _id: string, name: string } | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };



/**
 * __useGetResourceResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceResourcePageQuery(baseOptions: Apollo.QueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(Operations.getResourceResourcePage, options);
      }
export function useGetResourceResourcePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(Operations.getResourceResourcePage, options);
        }
export type GetResourceResourcePageQueryHookResult = ReturnType<typeof useGetResourceResourcePageQuery>;
export type GetResourceResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceResourcePageLazyQuery>;
export type GetResourceResourcePageQueryResult = Apollo.QueryResult<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>;