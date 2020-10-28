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

export type AttachResourceCoversConceptsMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
}>;


export type AttachResourceCoversConceptsMutation = (
  { __typename?: 'Mutation' }
  & { attachResourceCoversConcepts: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'ResourceCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
      )> }
    )>> }
  ) }
);

export type DetachResourceCoversConceptsMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
}>;


export type DetachResourceCoversConceptsMutation = (
  { __typename?: 'Mutation' }
  & { detachResourceCoversConcepts: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'ResourceCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
      )> }
    )>> }
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

export type AttachResourceToDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  resourceId: Types.Scalars['String'];
}>;


export type AttachResourceToDomainMutation = (
  { __typename?: 'Mutation' }
  & { attachResourceToDomain: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'ResourceCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      )> }
    )>> }
  ) }
);

export type DetachResourceFromDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  resourceId: Types.Scalars['String'];
}>;


export type DetachResourceFromDomainMutation = (
  { __typename?: 'Mutation' }
  & { detachResourceFromDomain: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'ResourceCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      )> }
    )>> }
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
export type AttachResourceCoversConceptsMutationFn = Apollo.MutationFunction<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>;

/**
 * __useAttachResourceCoversConceptsMutation__
 *
 * To run a mutation, you first call `useAttachResourceCoversConceptsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachResourceCoversConceptsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachResourceCoversConceptsMutation, { data, loading, error }] = useAttachResourceCoversConceptsMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      conceptIds: // value for 'conceptIds'
 *   },
 * });
 */
export function useAttachResourceCoversConceptsMutation(baseOptions?: Apollo.MutationHookOptions<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>) {
        return Apollo.useMutation<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>(Operations.attachResourceCoversConcepts, baseOptions);
      }
export type AttachResourceCoversConceptsMutationHookResult = ReturnType<typeof useAttachResourceCoversConceptsMutation>;
export type AttachResourceCoversConceptsMutationResult = Apollo.MutationResult<AttachResourceCoversConceptsMutation>;
export type AttachResourceCoversConceptsMutationOptions = Apollo.BaseMutationOptions<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>;
export type DetachResourceCoversConceptsMutationFn = Apollo.MutationFunction<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>;

/**
 * __useDetachResourceCoversConceptsMutation__
 *
 * To run a mutation, you first call `useDetachResourceCoversConceptsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachResourceCoversConceptsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachResourceCoversConceptsMutation, { data, loading, error }] = useDetachResourceCoversConceptsMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      conceptIds: // value for 'conceptIds'
 *   },
 * });
 */
export function useDetachResourceCoversConceptsMutation(baseOptions?: Apollo.MutationHookOptions<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>) {
        return Apollo.useMutation<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>(Operations.detachResourceCoversConcepts, baseOptions);
      }
export type DetachResourceCoversConceptsMutationHookResult = ReturnType<typeof useDetachResourceCoversConceptsMutation>;
export type DetachResourceCoversConceptsMutationResult = Apollo.MutationResult<DetachResourceCoversConceptsMutation>;
export type DetachResourceCoversConceptsMutationOptions = Apollo.BaseMutationOptions<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>;
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
export type AttachResourceToDomainMutationFn = Apollo.MutationFunction<AttachResourceToDomainMutation, AttachResourceToDomainMutationVariables>;

/**
 * __useAttachResourceToDomainMutation__
 *
 * To run a mutation, you first call `useAttachResourceToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachResourceToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachResourceToDomainMutation, { data, loading, error }] = useAttachResourceToDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useAttachResourceToDomainMutation(baseOptions?: Apollo.MutationHookOptions<AttachResourceToDomainMutation, AttachResourceToDomainMutationVariables>) {
        return Apollo.useMutation<AttachResourceToDomainMutation, AttachResourceToDomainMutationVariables>(Operations.attachResourceToDomain, baseOptions);
      }
export type AttachResourceToDomainMutationHookResult = ReturnType<typeof useAttachResourceToDomainMutation>;
export type AttachResourceToDomainMutationResult = Apollo.MutationResult<AttachResourceToDomainMutation>;
export type AttachResourceToDomainMutationOptions = Apollo.BaseMutationOptions<AttachResourceToDomainMutation, AttachResourceToDomainMutationVariables>;
export type DetachResourceFromDomainMutationFn = Apollo.MutationFunction<DetachResourceFromDomainMutation, DetachResourceFromDomainMutationVariables>;

/**
 * __useDetachResourceFromDomainMutation__
 *
 * To run a mutation, you first call `useDetachResourceFromDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachResourceFromDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachResourceFromDomainMutation, { data, loading, error }] = useDetachResourceFromDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useDetachResourceFromDomainMutation(baseOptions?: Apollo.MutationHookOptions<DetachResourceFromDomainMutation, DetachResourceFromDomainMutationVariables>) {
        return Apollo.useMutation<DetachResourceFromDomainMutation, DetachResourceFromDomainMutationVariables>(Operations.detachResourceFromDomain, baseOptions);
      }
export type DetachResourceFromDomainMutationHookResult = ReturnType<typeof useDetachResourceFromDomainMutation>;
export type DetachResourceFromDomainMutationResult = Apollo.MutationResult<DetachResourceFromDomainMutation>;
export type DetachResourceFromDomainMutationOptions = Apollo.BaseMutationOptions<DetachResourceFromDomainMutation, DetachResourceFromDomainMutationVariables>;