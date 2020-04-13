import * as Types from '../../graphql/types';

import * as Operations from './CoveredConceptsSelector';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type AttachResourceCoversConceptsMutationVariables = {
  resourceId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
};


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

export type DetachResourceCoversConceptsMutationVariables = {
  resourceId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
};


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


export type AttachResourceCoversConceptsMutationFn = ApolloReactCommon.MutationFunction<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>;

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
export function useAttachResourceCoversConceptsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>) {
        return ApolloReactHooks.useMutation<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>(Operations.attachResourceCoversConcepts, baseOptions);
      }
export type AttachResourceCoversConceptsMutationHookResult = ReturnType<typeof useAttachResourceCoversConceptsMutation>;
export type AttachResourceCoversConceptsMutationResult = ApolloReactCommon.MutationResult<AttachResourceCoversConceptsMutation>;
export type AttachResourceCoversConceptsMutationOptions = ApolloReactCommon.BaseMutationOptions<AttachResourceCoversConceptsMutation, AttachResourceCoversConceptsMutationVariables>;
export type DetachResourceCoversConceptsMutationFn = ApolloReactCommon.MutationFunction<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>;

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
export function useDetachResourceCoversConceptsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>) {
        return ApolloReactHooks.useMutation<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>(Operations.detachResourceCoversConcepts, baseOptions);
      }
export type DetachResourceCoversConceptsMutationHookResult = ReturnType<typeof useDetachResourceCoversConceptsMutation>;
export type DetachResourceCoversConceptsMutationResult = ApolloReactCommon.MutationResult<DetachResourceCoversConceptsMutation>;
export type DetachResourceCoversConceptsMutationOptions = ApolloReactCommon.BaseMutationOptions<DetachResourceCoversConceptsMutation, DetachResourceCoversConceptsMutationVariables>;