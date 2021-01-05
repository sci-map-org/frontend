import * as Types from '../types';

import { LearningGoalDataFragment } from './learning_goals.fragments.generated';
import { DomainDataFragment } from '../domains/domains.fragments.generated';
import { SubGoalCardDataFragment } from '../../components/learning_goals/SubGoalCard.generated';
import * as Operations from './learning_goals.operations';
import * as Apollo from '@apollo/client';
export type CreateLearningGoalMutationVariables = Types.Exact<{
  payload: Types.CreateLearningGoalPayload;
}>;


export type CreateLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { createLearningGoal: (
    { __typename?: 'LearningGoal' }
    & LearningGoalDataFragment
  ) }
);

export type AddLearningGoalToDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  payload: Types.AddLearningGoalToDomainPayload;
}>;


export type AddLearningGoalToDomainMutation = (
  { __typename?: 'Mutation' }
  & { addLearningGoalToDomain: (
    { __typename?: 'DomainAndLearningGoalResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & { domain?: Types.Maybe<(
        { __typename?: 'LearningGoalBelongsToDomain' }
        & Pick<Types.LearningGoalBelongsToDomain, 'contextualKey' | 'contextualName'>
        & { domain: (
          { __typename?: 'Domain' }
          & DomainDataFragment
        ) }
      )> }
      & LearningGoalDataFragment
    ) }
  ) }
);

export type UpdateLearningGoalMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  payload: Types.UpdateLearningGoalPayload;
}>;


export type UpdateLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { updateLearningGoal: (
    { __typename?: 'LearningGoal' }
    & LearningGoalDataFragment
  ) }
);

export type DeleteLearningGoalMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { deleteLearningGoal: (
    { __typename?: 'DeleteLearningGoalMutationResult' }
    & Pick<Types.DeleteLearningGoalMutationResult, '_id' | 'success'>
  ) }
);

export type AttachLearningGoalRequiresSubGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  subGoalId: Types.Scalars['String'];
  payload: Types.AttachLearningGoalRequiresSubGoalPayload;
}>;


export type AttachLearningGoalRequiresSubGoalMutation = (
  { __typename?: 'Mutation' }
  & { attachLearningGoalRequiresSubGoal: (
    { __typename?: 'AttachLearningGoalRequiresSubGoalResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
      & { requiredSubGoals?: Types.Maybe<Array<(
        { __typename?: 'SubGoalItem' }
        & SubGoalCardDataFragment
      )>> }
    ) }
  ) }
);

export type DetachLearningGoalRequiresSubGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  subGoalId: Types.Scalars['String'];
}>;


export type DetachLearningGoalRequiresSubGoalMutation = (
  { __typename?: 'Mutation' }
  & { detachLearningGoalRequiresSubGoal: (
    { __typename?: 'DetachLearningGoalRequiresSubGoalResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
      & { requiredSubGoals?: Types.Maybe<Array<(
        { __typename?: 'SubGoalItem' }
        & SubGoalCardDataFragment
      )>> }
    ) }
  ) }
);


export type CreateLearningGoalMutationFn = Apollo.MutationFunction<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>;

/**
 * __useCreateLearningGoalMutation__
 *
 * To run a mutation, you first call `useCreateLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLearningGoalMutation, { data, loading, error }] = useCreateLearningGoalMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>) {
        return Apollo.useMutation<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>(Operations.createLearningGoal, baseOptions);
      }
export type CreateLearningGoalMutationHookResult = ReturnType<typeof useCreateLearningGoalMutation>;
export type CreateLearningGoalMutationResult = Apollo.MutationResult<CreateLearningGoalMutation>;
export type CreateLearningGoalMutationOptions = Apollo.BaseMutationOptions<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>;
export type AddLearningGoalToDomainMutationFn = Apollo.MutationFunction<AddLearningGoalToDomainMutation, AddLearningGoalToDomainMutationVariables>;

/**
 * __useAddLearningGoalToDomainMutation__
 *
 * To run a mutation, you first call `useAddLearningGoalToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLearningGoalToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLearningGoalToDomainMutation, { data, loading, error }] = useAddLearningGoalToDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddLearningGoalToDomainMutation(baseOptions?: Apollo.MutationHookOptions<AddLearningGoalToDomainMutation, AddLearningGoalToDomainMutationVariables>) {
        return Apollo.useMutation<AddLearningGoalToDomainMutation, AddLearningGoalToDomainMutationVariables>(Operations.addLearningGoalToDomain, baseOptions);
      }
export type AddLearningGoalToDomainMutationHookResult = ReturnType<typeof useAddLearningGoalToDomainMutation>;
export type AddLearningGoalToDomainMutationResult = Apollo.MutationResult<AddLearningGoalToDomainMutation>;
export type AddLearningGoalToDomainMutationOptions = Apollo.BaseMutationOptions<AddLearningGoalToDomainMutation, AddLearningGoalToDomainMutationVariables>;
export type UpdateLearningGoalMutationFn = Apollo.MutationFunction<UpdateLearningGoalMutation, UpdateLearningGoalMutationVariables>;

/**
 * __useUpdateLearningGoalMutation__
 *
 * To run a mutation, you first call `useUpdateLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLearningGoalMutation, { data, loading, error }] = useUpdateLearningGoalMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLearningGoalMutation, UpdateLearningGoalMutationVariables>) {
        return Apollo.useMutation<UpdateLearningGoalMutation, UpdateLearningGoalMutationVariables>(Operations.updateLearningGoal, baseOptions);
      }
export type UpdateLearningGoalMutationHookResult = ReturnType<typeof useUpdateLearningGoalMutation>;
export type UpdateLearningGoalMutationResult = Apollo.MutationResult<UpdateLearningGoalMutation>;
export type UpdateLearningGoalMutationOptions = Apollo.BaseMutationOptions<UpdateLearningGoalMutation, UpdateLearningGoalMutationVariables>;
export type DeleteLearningGoalMutationFn = Apollo.MutationFunction<DeleteLearningGoalMutation, DeleteLearningGoalMutationVariables>;

/**
 * __useDeleteLearningGoalMutation__
 *
 * To run a mutation, you first call `useDeleteLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLearningGoalMutation, { data, loading, error }] = useDeleteLearningGoalMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLearningGoalMutation, DeleteLearningGoalMutationVariables>) {
        return Apollo.useMutation<DeleteLearningGoalMutation, DeleteLearningGoalMutationVariables>(Operations.deleteLearningGoal, baseOptions);
      }
export type DeleteLearningGoalMutationHookResult = ReturnType<typeof useDeleteLearningGoalMutation>;
export type DeleteLearningGoalMutationResult = Apollo.MutationResult<DeleteLearningGoalMutation>;
export type DeleteLearningGoalMutationOptions = Apollo.BaseMutationOptions<DeleteLearningGoalMutation, DeleteLearningGoalMutationVariables>;
export type AttachLearningGoalRequiresSubGoalMutationFn = Apollo.MutationFunction<AttachLearningGoalRequiresSubGoalMutation, AttachLearningGoalRequiresSubGoalMutationVariables>;

/**
 * __useAttachLearningGoalRequiresSubGoalMutation__
 *
 * To run a mutation, you first call `useAttachLearningGoalRequiresSubGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachLearningGoalRequiresSubGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachLearningGoalRequiresSubGoalMutation, { data, loading, error }] = useAttachLearningGoalRequiresSubGoalMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *      subGoalId: // value for 'subGoalId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAttachLearningGoalRequiresSubGoalMutation(baseOptions?: Apollo.MutationHookOptions<AttachLearningGoalRequiresSubGoalMutation, AttachLearningGoalRequiresSubGoalMutationVariables>) {
        return Apollo.useMutation<AttachLearningGoalRequiresSubGoalMutation, AttachLearningGoalRequiresSubGoalMutationVariables>(Operations.attachLearningGoalRequiresSubGoal, baseOptions);
      }
export type AttachLearningGoalRequiresSubGoalMutationHookResult = ReturnType<typeof useAttachLearningGoalRequiresSubGoalMutation>;
export type AttachLearningGoalRequiresSubGoalMutationResult = Apollo.MutationResult<AttachLearningGoalRequiresSubGoalMutation>;
export type AttachLearningGoalRequiresSubGoalMutationOptions = Apollo.BaseMutationOptions<AttachLearningGoalRequiresSubGoalMutation, AttachLearningGoalRequiresSubGoalMutationVariables>;
export type DetachLearningGoalRequiresSubGoalMutationFn = Apollo.MutationFunction<DetachLearningGoalRequiresSubGoalMutation, DetachLearningGoalRequiresSubGoalMutationVariables>;

/**
 * __useDetachLearningGoalRequiresSubGoalMutation__
 *
 * To run a mutation, you first call `useDetachLearningGoalRequiresSubGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachLearningGoalRequiresSubGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachLearningGoalRequiresSubGoalMutation, { data, loading, error }] = useDetachLearningGoalRequiresSubGoalMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *      subGoalId: // value for 'subGoalId'
 *   },
 * });
 */
export function useDetachLearningGoalRequiresSubGoalMutation(baseOptions?: Apollo.MutationHookOptions<DetachLearningGoalRequiresSubGoalMutation, DetachLearningGoalRequiresSubGoalMutationVariables>) {
        return Apollo.useMutation<DetachLearningGoalRequiresSubGoalMutation, DetachLearningGoalRequiresSubGoalMutationVariables>(Operations.detachLearningGoalRequiresSubGoal, baseOptions);
      }
export type DetachLearningGoalRequiresSubGoalMutationHookResult = ReturnType<typeof useDetachLearningGoalRequiresSubGoalMutation>;
export type DetachLearningGoalRequiresSubGoalMutationResult = Apollo.MutationResult<DetachLearningGoalRequiresSubGoalMutation>;
export type DetachLearningGoalRequiresSubGoalMutationOptions = Apollo.BaseMutationOptions<DetachLearningGoalRequiresSubGoalMutation, DetachLearningGoalRequiresSubGoalMutationVariables>;