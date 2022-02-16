import * as Types from '../types';

import * as Operations from './resources.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchResourcesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  options: Types.SearchResourcesOptions;
}>;


export type SearchResourcesQuery = { __typename?: 'Query', searchResources: { __typename?: 'SearchResourcesResult', items: Array<{ __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined }> } };

export type GetResourcePreviewDataQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourcePreviewDataQuery = { __typename?: 'Query', getResourceById: { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, recommendationsCount?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined } };

export type DeleteResourceMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteResourceMutation = { __typename?: 'Mutation', deleteResource: { __typename?: 'DeleteResourceResponse', _id: string, success: boolean } };

export type SetResourceOpenedMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
}>;


export type SetResourceOpenedMutation = { __typename?: 'Mutation', setResourcesConsumed: Array<{ __typename?: 'Resource', _id: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, lastOpenedAt?: any | null | undefined } | null | undefined }> };

export type SetResourceConsumedMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
  consumed: Types.Scalars['Boolean'];
}>;


export type SetResourceConsumedMutation = { __typename?: 'Mutation', setResourcesConsumed: Array<{ __typename?: 'Resource', _id: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined }> };

export type AnalyzeResourceUrlQueryVariables = Types.Exact<{
  url: Types.Scalars['String'];
}>;


export type AnalyzeResourceUrlQuery = { __typename?: 'Query', analyzeResourceUrl: { __typename?: 'AnalyzeResourceUrlResult', resourceData?: { __typename?: 'ResourceData', name?: string | null | undefined, types?: Array<Types.ResourceType> | null | undefined, description?: string | null | undefined, durationSeconds?: number | null | undefined, subResourceSeries?: Array<{ __typename?: 'SubResourceExtractedData', name: string, url: string, types: Array<Types.ResourceType>, description?: string | null | undefined, durationSeconds?: number | null | undefined }> | null | undefined } | null | undefined } };



/**
 * __useSearchResourcesQuery__
 *
 * To run a query within a React component, call `useSearchResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResourcesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchResourcesQuery(baseOptions: Apollo.QueryHookOptions<SearchResourcesQuery, SearchResourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchResourcesQuery, SearchResourcesQueryVariables>(Operations.searchResources, options);
      }
export function useSearchResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchResourcesQuery, SearchResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchResourcesQuery, SearchResourcesQueryVariables>(Operations.searchResources, options);
        }
export type SearchResourcesQueryHookResult = ReturnType<typeof useSearchResourcesQuery>;
export type SearchResourcesLazyQueryHookResult = ReturnType<typeof useSearchResourcesLazyQuery>;
export type SearchResourcesQueryResult = Apollo.QueryResult<SearchResourcesQuery, SearchResourcesQueryVariables>;

/**
 * __useGetResourcePreviewDataQuery__
 *
 * To run a query within a React component, call `useGetResourcePreviewDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourcePreviewDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourcePreviewDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourcePreviewDataQuery(baseOptions: Apollo.QueryHookOptions<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>(Operations.getResourcePreviewData, options);
      }
export function useGetResourcePreviewDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>(Operations.getResourcePreviewData, options);
        }
export type GetResourcePreviewDataQueryHookResult = ReturnType<typeof useGetResourcePreviewDataQuery>;
export type GetResourcePreviewDataLazyQueryHookResult = ReturnType<typeof useGetResourcePreviewDataLazyQuery>;
export type GetResourcePreviewDataQueryResult = Apollo.QueryResult<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>;
export type DeleteResourceMutationFn = Apollo.MutationFunction<DeleteResourceMutation, DeleteResourceMutationVariables>;

/**
 * __useDeleteResourceMutation__
 *
 * To run a mutation, you first call `useDeleteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResourceMutation, { data, loading, error }] = useDeleteResourceMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteResourceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteResourceMutation, DeleteResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteResourceMutation, DeleteResourceMutationVariables>(Operations.deleteResource, options);
      }
export type DeleteResourceMutationHookResult = ReturnType<typeof useDeleteResourceMutation>;
export type DeleteResourceMutationResult = Apollo.MutationResult<DeleteResourceMutation>;
export type DeleteResourceMutationOptions = Apollo.BaseMutationOptions<DeleteResourceMutation, DeleteResourceMutationVariables>;
export type SetResourceOpenedMutationFn = Apollo.MutationFunction<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>;

/**
 * __useSetResourceOpenedMutation__
 *
 * To run a mutation, you first call `useSetResourceOpenedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetResourceOpenedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setResourceOpenedMutation, { data, loading, error }] = useSetResourceOpenedMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useSetResourceOpenedMutation(baseOptions?: Apollo.MutationHookOptions<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>(Operations.setResourceOpened, options);
      }
export type SetResourceOpenedMutationHookResult = ReturnType<typeof useSetResourceOpenedMutation>;
export type SetResourceOpenedMutationResult = Apollo.MutationResult<SetResourceOpenedMutation>;
export type SetResourceOpenedMutationOptions = Apollo.BaseMutationOptions<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>;
export type SetResourceConsumedMutationFn = Apollo.MutationFunction<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>;

/**
 * __useSetResourceConsumedMutation__
 *
 * To run a mutation, you first call `useSetResourceConsumedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetResourceConsumedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setResourceConsumedMutation, { data, loading, error }] = useSetResourceConsumedMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      consumed: // value for 'consumed'
 *   },
 * });
 */
export function useSetResourceConsumedMutation(baseOptions?: Apollo.MutationHookOptions<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>(Operations.setResourceConsumed, options);
      }
export type SetResourceConsumedMutationHookResult = ReturnType<typeof useSetResourceConsumedMutation>;
export type SetResourceConsumedMutationResult = Apollo.MutationResult<SetResourceConsumedMutation>;
export type SetResourceConsumedMutationOptions = Apollo.BaseMutationOptions<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>;

/**
 * __useAnalyzeResourceUrlQuery__
 *
 * To run a query within a React component, call `useAnalyzeResourceUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyzeResourceUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyzeResourceUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAnalyzeResourceUrlQuery(baseOptions: Apollo.QueryHookOptions<AnalyzeResourceUrlQuery, AnalyzeResourceUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyzeResourceUrlQuery, AnalyzeResourceUrlQueryVariables>(Operations.analyzeResourceUrl, options);
      }
export function useAnalyzeResourceUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyzeResourceUrlQuery, AnalyzeResourceUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyzeResourceUrlQuery, AnalyzeResourceUrlQueryVariables>(Operations.analyzeResourceUrl, options);
        }
export type AnalyzeResourceUrlQueryHookResult = ReturnType<typeof useAnalyzeResourceUrlQuery>;
export type AnalyzeResourceUrlLazyQueryHookResult = ReturnType<typeof useAnalyzeResourceUrlLazyQuery>;
export type AnalyzeResourceUrlQueryResult = Apollo.QueryResult<AnalyzeResourceUrlQuery, AnalyzeResourceUrlQueryVariables>;