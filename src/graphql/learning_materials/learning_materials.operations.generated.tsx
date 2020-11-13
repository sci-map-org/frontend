import * as Types from '../types';

import * as Operations from './learning_materials.operations';
import * as Apollo from '@apollo/client';
export type AttachLearningMaterialToDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  learningMaterialId: Types.Scalars['String'];
}>;


export type AttachLearningMaterialToDomainMutation = (
  { __typename?: 'Mutation' }
  & { attachLearningMaterialToDomain: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      )> }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
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

export type DetachLearningMaterialFromDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  learningMaterialId: Types.Scalars['String'];
}>;


export type DetachLearningMaterialFromDomainMutation = (
  { __typename?: 'Mutation' }
  & { detachLearningMaterialFromDomain: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      )> }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
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

export type AttachLearningMaterialCoversConceptsMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
}>;


export type AttachLearningMaterialCoversConceptsMutation = (
  { __typename?: 'Mutation' }
  & { attachLearningMaterialCoversConcepts: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
      )> }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
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

export type DetachLearningMaterialCoversConceptsMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
}>;


export type DetachLearningMaterialCoversConceptsMutation = (
  { __typename?: 'Mutation' }
  & { detachLearningMaterialCoversConcepts: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
      )> }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
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


export type AttachLearningMaterialToDomainMutationFn = Apollo.MutationFunction<AttachLearningMaterialToDomainMutation, AttachLearningMaterialToDomainMutationVariables>;

/**
 * __useAttachLearningMaterialToDomainMutation__
 *
 * To run a mutation, you first call `useAttachLearningMaterialToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachLearningMaterialToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachLearningMaterialToDomainMutation, { data, loading, error }] = useAttachLearningMaterialToDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      learningMaterialId: // value for 'learningMaterialId'
 *   },
 * });
 */
export function useAttachLearningMaterialToDomainMutation(baseOptions?: Apollo.MutationHookOptions<AttachLearningMaterialToDomainMutation, AttachLearningMaterialToDomainMutationVariables>) {
        return Apollo.useMutation<AttachLearningMaterialToDomainMutation, AttachLearningMaterialToDomainMutationVariables>(Operations.attachLearningMaterialToDomain, baseOptions);
      }
export type AttachLearningMaterialToDomainMutationHookResult = ReturnType<typeof useAttachLearningMaterialToDomainMutation>;
export type AttachLearningMaterialToDomainMutationResult = Apollo.MutationResult<AttachLearningMaterialToDomainMutation>;
export type AttachLearningMaterialToDomainMutationOptions = Apollo.BaseMutationOptions<AttachLearningMaterialToDomainMutation, AttachLearningMaterialToDomainMutationVariables>;
export type DetachLearningMaterialFromDomainMutationFn = Apollo.MutationFunction<DetachLearningMaterialFromDomainMutation, DetachLearningMaterialFromDomainMutationVariables>;

/**
 * __useDetachLearningMaterialFromDomainMutation__
 *
 * To run a mutation, you first call `useDetachLearningMaterialFromDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachLearningMaterialFromDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachLearningMaterialFromDomainMutation, { data, loading, error }] = useDetachLearningMaterialFromDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      learningMaterialId: // value for 'learningMaterialId'
 *   },
 * });
 */
export function useDetachLearningMaterialFromDomainMutation(baseOptions?: Apollo.MutationHookOptions<DetachLearningMaterialFromDomainMutation, DetachLearningMaterialFromDomainMutationVariables>) {
        return Apollo.useMutation<DetachLearningMaterialFromDomainMutation, DetachLearningMaterialFromDomainMutationVariables>(Operations.detachLearningMaterialFromDomain, baseOptions);
      }
export type DetachLearningMaterialFromDomainMutationHookResult = ReturnType<typeof useDetachLearningMaterialFromDomainMutation>;
export type DetachLearningMaterialFromDomainMutationResult = Apollo.MutationResult<DetachLearningMaterialFromDomainMutation>;
export type DetachLearningMaterialFromDomainMutationOptions = Apollo.BaseMutationOptions<DetachLearningMaterialFromDomainMutation, DetachLearningMaterialFromDomainMutationVariables>;
export type AttachLearningMaterialCoversConceptsMutationFn = Apollo.MutationFunction<AttachLearningMaterialCoversConceptsMutation, AttachLearningMaterialCoversConceptsMutationVariables>;

/**
 * __useAttachLearningMaterialCoversConceptsMutation__
 *
 * To run a mutation, you first call `useAttachLearningMaterialCoversConceptsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachLearningMaterialCoversConceptsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachLearningMaterialCoversConceptsMutation, { data, loading, error }] = useAttachLearningMaterialCoversConceptsMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      conceptIds: // value for 'conceptIds'
 *   },
 * });
 */
export function useAttachLearningMaterialCoversConceptsMutation(baseOptions?: Apollo.MutationHookOptions<AttachLearningMaterialCoversConceptsMutation, AttachLearningMaterialCoversConceptsMutationVariables>) {
        return Apollo.useMutation<AttachLearningMaterialCoversConceptsMutation, AttachLearningMaterialCoversConceptsMutationVariables>(Operations.attachLearningMaterialCoversConcepts, baseOptions);
      }
export type AttachLearningMaterialCoversConceptsMutationHookResult = ReturnType<typeof useAttachLearningMaterialCoversConceptsMutation>;
export type AttachLearningMaterialCoversConceptsMutationResult = Apollo.MutationResult<AttachLearningMaterialCoversConceptsMutation>;
export type AttachLearningMaterialCoversConceptsMutationOptions = Apollo.BaseMutationOptions<AttachLearningMaterialCoversConceptsMutation, AttachLearningMaterialCoversConceptsMutationVariables>;
export type DetachLearningMaterialCoversConceptsMutationFn = Apollo.MutationFunction<DetachLearningMaterialCoversConceptsMutation, DetachLearningMaterialCoversConceptsMutationVariables>;

/**
 * __useDetachLearningMaterialCoversConceptsMutation__
 *
 * To run a mutation, you first call `useDetachLearningMaterialCoversConceptsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachLearningMaterialCoversConceptsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachLearningMaterialCoversConceptsMutation, { data, loading, error }] = useDetachLearningMaterialCoversConceptsMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      conceptIds: // value for 'conceptIds'
 *   },
 * });
 */
export function useDetachLearningMaterialCoversConceptsMutation(baseOptions?: Apollo.MutationHookOptions<DetachLearningMaterialCoversConceptsMutation, DetachLearningMaterialCoversConceptsMutationVariables>) {
        return Apollo.useMutation<DetachLearningMaterialCoversConceptsMutation, DetachLearningMaterialCoversConceptsMutationVariables>(Operations.detachLearningMaterialCoversConcepts, baseOptions);
      }
export type DetachLearningMaterialCoversConceptsMutationHookResult = ReturnType<typeof useDetachLearningMaterialCoversConceptsMutation>;
export type DetachLearningMaterialCoversConceptsMutationResult = Apollo.MutationResult<DetachLearningMaterialCoversConceptsMutation>;
export type DetachLearningMaterialCoversConceptsMutationOptions = Apollo.BaseMutationOptions<DetachLearningMaterialCoversConceptsMutation, DetachLearningMaterialCoversConceptsMutationVariables>;