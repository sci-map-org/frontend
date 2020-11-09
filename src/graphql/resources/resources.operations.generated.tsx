import * as Types from '../types';

import { ResourceDataFragment, ResourcePreviewDataFragment } from './resources.fragments.generated';
import * as Operations from './resources.operations';
import * as Apollo from '@apollo/client';
export type SearchResourcesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  options: Types.SearchResourcesOptions;
}>;


export type SearchResourcesQuery = (
  { __typename?: 'Query' }
  & { searchResources: (
    { __typename?: 'SearchResourcesResult' }
    & { items: Array<(
      { __typename?: 'Resource' }
      & ResourceDataFragment
    )> }
  ) }
);

export type GetResourcePreviewDataQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourcePreviewDataQuery = (
  { __typename?: 'Query' }
  & { getResourceById: (
    { __typename?: 'Resource' }
    & ResourcePreviewDataFragment
  ) }
);

export type VoteResourceMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
  value: Types.ResourceVoteValue;
}>;


export type VoteResourceMutation = (
  { __typename?: 'Mutation' }
  & { voteResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'upvotes'>
  ) }
);

export type DeleteResourceMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteResourceMutation = (
  { __typename?: 'Mutation' }
  & { deleteResource: (
    { __typename?: 'DeleteResourceResponse' }
    & Pick<Types.DeleteResourceResponse, '_id' | 'success'>
  ) }
);



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
export function useSearchResourcesQuery(baseOptions?: Apollo.QueryHookOptions<SearchResourcesQuery, SearchResourcesQueryVariables>) {
        return Apollo.useQuery<SearchResourcesQuery, SearchResourcesQueryVariables>(Operations.searchResources, baseOptions);
      }
export function useSearchResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchResourcesQuery, SearchResourcesQueryVariables>) {
          return Apollo.useLazyQuery<SearchResourcesQuery, SearchResourcesQueryVariables>(Operations.searchResources, baseOptions);
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
export function useGetResourcePreviewDataQuery(baseOptions?: Apollo.QueryHookOptions<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>) {
        return Apollo.useQuery<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>(Operations.getResourcePreviewData, baseOptions);
      }
export function useGetResourcePreviewDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>) {
          return Apollo.useLazyQuery<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>(Operations.getResourcePreviewData, baseOptions);
        }
export type GetResourcePreviewDataQueryHookResult = ReturnType<typeof useGetResourcePreviewDataQuery>;
export type GetResourcePreviewDataLazyQueryHookResult = ReturnType<typeof useGetResourcePreviewDataLazyQuery>;
export type GetResourcePreviewDataQueryResult = Apollo.QueryResult<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>;
export type VoteResourceMutationFn = Apollo.MutationFunction<VoteResourceMutation, VoteResourceMutationVariables>;

/**
 * __useVoteResourceMutation__
 *
 * To run a mutation, you first call `useVoteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteResourceMutation, { data, loading, error }] = useVoteResourceMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteResourceMutation(baseOptions?: Apollo.MutationHookOptions<VoteResourceMutation, VoteResourceMutationVariables>) {
        return Apollo.useMutation<VoteResourceMutation, VoteResourceMutationVariables>(Operations.voteResource, baseOptions);
      }
export type VoteResourceMutationHookResult = ReturnType<typeof useVoteResourceMutation>;
export type VoteResourceMutationResult = Apollo.MutationResult<VoteResourceMutation>;
export type VoteResourceMutationOptions = Apollo.BaseMutationOptions<VoteResourceMutation, VoteResourceMutationVariables>;
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
        return Apollo.useMutation<DeleteResourceMutation, DeleteResourceMutationVariables>(Operations.deleteResource, baseOptions);
      }
export type DeleteResourceMutationHookResult = ReturnType<typeof useDeleteResourceMutation>;
export type DeleteResourceMutationResult = Apollo.MutationResult<DeleteResourceMutation>;
export type DeleteResourceMutationOptions = Apollo.BaseMutationOptions<DeleteResourceMutation, DeleteResourceMutationVariables>;