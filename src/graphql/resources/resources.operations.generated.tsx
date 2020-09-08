import * as Types from '../types';

import * as Operations from './resources.operations';
import * as Apollo from '@apollo/client';
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
    & { coveredConcepts?: Types.Maybe<(
      { __typename?: 'ResourceCoveredConceptsResults' }
      & { items: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
      )> }
    )> }
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
    & { coveredConcepts?: Types.Maybe<(
      { __typename?: 'ResourceCoveredConceptsResults' }
      & { items: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
      )> }
    )> }
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