import * as Types from '../types';

import { LearningGoalDataFragment } from './learning_goals.fragments.generated';
import { DomainLinkDataFragment, DomainDataFragment } from '../domains/domains.fragments.generated';
import { SubGoalCardDataFragment } from '../../components/learning_goals/SubGoalCard.generated';
import * as Operations from './learning_goals.operations';
import * as Apollo from '@apollo/client';
export type CreateLearningGoalMutationVariables = Types.Exact<{
  payload: Types.CreateLearningGoalPayload;
  options?: Types.Maybe<Types.CreateLearningGoalOptions>;
}>;


export type CreateLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { createLearningGoal: (
    { __typename?: 'LearningGoal' }
    & { domain?: Types.Maybe<(
      { __typename?: 'LearningGoalBelongsToDomain' }
      & Pick<Types.LearningGoalBelongsToDomain, 'index'>
      & { domain: (
        { __typename?: 'Domain' }
        & DomainLinkDataFragment
      ) }
    )> }
    & LearningGoalDataFragment
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

export type StartLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
}>;


export type StartLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { startLearningGoal: (
    { __typename?: 'LearningGoalStartedResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
      & { started?: Types.Maybe<(
        { __typename?: 'LearningGoalStarted' }
        & Pick<Types.LearningGoalStarted, 'startedAt'>
      )> }
    ), currentUser: (
      { __typename?: 'CurrentUser' }
      & { startedLearningGoals?: Types.Maybe<Array<(
        { __typename?: 'LearningGoalStartedItem' }
        & Pick<Types.LearningGoalStartedItem, 'startedAt'>
        & { learningGoal: (
          { __typename?: 'LearningGoal' }
          & Pick<Types.LearningGoal, '_id'>
        ) }
      )>> }
    ) }
  ) }
);

export type PublishLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
}>;


export type PublishLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { publishLearningGoal: (
    { __typename?: 'LearningGoalPublishedResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id' | 'publishedAt' | 'hidden'>
      & { requiredSubGoals?: Types.Maybe<Array<(
        { __typename?: 'SubGoalItem' }
        & { subGoal: (
          { __typename?: 'LearningGoal' }
          & Pick<Types.LearningGoal, '_id' | 'publishedAt' | 'hidden'>
        ) | { __typename?: 'Concept' } }
      )>> }
    ) }
  ) }
);

export type IndexLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
}>;


export type IndexLearningGoalMutation = (
  { __typename?: 'Mutation' }
  & { indexLearningGoal: (
    { __typename?: 'LearningGoalIndexedResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id' | 'hidden'>
      & { domain?: Types.Maybe<(
        { __typename?: 'LearningGoalBelongsToDomain' }
        & { domain: (
          { __typename?: 'Domain' }
          & { learningGoals?: Types.Maybe<Array<(
            { __typename?: 'LearningGoalBelongsToDomain' }
            & Pick<Types.LearningGoalBelongsToDomain, 'index'>
            & { learningGoal: (
              { __typename?: 'LearningGoal' }
              & Pick<Types.LearningGoal, '_id'>
            ) }
          )>> }
        ) }
      )> }
    ) }
  ) }
);

export type AttachLearningGoalToDomainMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  domainId: Types.Scalars['String'];
  payload: Types.AttachLearningGoalToDomainPayload;
}>;


export type AttachLearningGoalToDomainMutation = (
  { __typename?: 'Mutation' }
  & { attachLearningGoalToDomain: (
    { __typename?: 'DomainAndLearningGoalResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
      & { domain?: Types.Maybe<(
        { __typename?: 'LearningGoalBelongsToDomain' }
        & Pick<Types.LearningGoalBelongsToDomain, 'index'>
        & { domain: (
          { __typename?: 'Domain' }
          & DomainDataFragment
        ) }
      )> }
    ) }
  ) }
);

export type DetachLearningGoalFromDomainMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  domainId: Types.Scalars['String'];
}>;


export type DetachLearningGoalFromDomainMutation = (
  { __typename?: 'Mutation' }
  & { detachLearningGoalFromDomain: (
    { __typename?: 'DomainAndLearningGoalResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>) {
        return Apollo.useMutation<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>(Operations.createLearningGoal, baseOptions);
      }
export type CreateLearningGoalMutationHookResult = ReturnType<typeof useCreateLearningGoalMutation>;
export type CreateLearningGoalMutationResult = Apollo.MutationResult<CreateLearningGoalMutation>;
export type CreateLearningGoalMutationOptions = Apollo.BaseMutationOptions<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>;
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
export type StartLearningGoalMutationFn = Apollo.MutationFunction<StartLearningGoalMutation, StartLearningGoalMutationVariables>;

/**
 * __useStartLearningGoalMutation__
 *
 * To run a mutation, you first call `useStartLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startLearningGoalMutation, { data, loading, error }] = useStartLearningGoalMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *   },
 * });
 */
export function useStartLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<StartLearningGoalMutation, StartLearningGoalMutationVariables>) {
        return Apollo.useMutation<StartLearningGoalMutation, StartLearningGoalMutationVariables>(Operations.startLearningGoal, baseOptions);
      }
export type StartLearningGoalMutationHookResult = ReturnType<typeof useStartLearningGoalMutation>;
export type StartLearningGoalMutationResult = Apollo.MutationResult<StartLearningGoalMutation>;
export type StartLearningGoalMutationOptions = Apollo.BaseMutationOptions<StartLearningGoalMutation, StartLearningGoalMutationVariables>;
export type PublishLearningGoalMutationFn = Apollo.MutationFunction<PublishLearningGoalMutation, PublishLearningGoalMutationVariables>;

/**
 * __usePublishLearningGoalMutation__
 *
 * To run a mutation, you first call `usePublishLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishLearningGoalMutation, { data, loading, error }] = usePublishLearningGoalMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *   },
 * });
 */
export function usePublishLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<PublishLearningGoalMutation, PublishLearningGoalMutationVariables>) {
        return Apollo.useMutation<PublishLearningGoalMutation, PublishLearningGoalMutationVariables>(Operations.publishLearningGoal, baseOptions);
      }
export type PublishLearningGoalMutationHookResult = ReturnType<typeof usePublishLearningGoalMutation>;
export type PublishLearningGoalMutationResult = Apollo.MutationResult<PublishLearningGoalMutation>;
export type PublishLearningGoalMutationOptions = Apollo.BaseMutationOptions<PublishLearningGoalMutation, PublishLearningGoalMutationVariables>;
export type IndexLearningGoalMutationFn = Apollo.MutationFunction<IndexLearningGoalMutation, IndexLearningGoalMutationVariables>;

/**
 * __useIndexLearningGoalMutation__
 *
 * To run a mutation, you first call `useIndexLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIndexLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [indexLearningGoalMutation, { data, loading, error }] = useIndexLearningGoalMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *   },
 * });
 */
export function useIndexLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<IndexLearningGoalMutation, IndexLearningGoalMutationVariables>) {
        return Apollo.useMutation<IndexLearningGoalMutation, IndexLearningGoalMutationVariables>(Operations.indexLearningGoal, baseOptions);
      }
export type IndexLearningGoalMutationHookResult = ReturnType<typeof useIndexLearningGoalMutation>;
export type IndexLearningGoalMutationResult = Apollo.MutationResult<IndexLearningGoalMutation>;
export type IndexLearningGoalMutationOptions = Apollo.BaseMutationOptions<IndexLearningGoalMutation, IndexLearningGoalMutationVariables>;
export type AttachLearningGoalToDomainMutationFn = Apollo.MutationFunction<AttachLearningGoalToDomainMutation, AttachLearningGoalToDomainMutationVariables>;

/**
 * __useAttachLearningGoalToDomainMutation__
 *
 * To run a mutation, you first call `useAttachLearningGoalToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachLearningGoalToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachLearningGoalToDomainMutation, { data, loading, error }] = useAttachLearningGoalToDomainMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *      domainId: // value for 'domainId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAttachLearningGoalToDomainMutation(baseOptions?: Apollo.MutationHookOptions<AttachLearningGoalToDomainMutation, AttachLearningGoalToDomainMutationVariables>) {
        return Apollo.useMutation<AttachLearningGoalToDomainMutation, AttachLearningGoalToDomainMutationVariables>(Operations.attachLearningGoalToDomain, baseOptions);
      }
export type AttachLearningGoalToDomainMutationHookResult = ReturnType<typeof useAttachLearningGoalToDomainMutation>;
export type AttachLearningGoalToDomainMutationResult = Apollo.MutationResult<AttachLearningGoalToDomainMutation>;
export type AttachLearningGoalToDomainMutationOptions = Apollo.BaseMutationOptions<AttachLearningGoalToDomainMutation, AttachLearningGoalToDomainMutationVariables>;
export type DetachLearningGoalFromDomainMutationFn = Apollo.MutationFunction<DetachLearningGoalFromDomainMutation, DetachLearningGoalFromDomainMutationVariables>;

/**
 * __useDetachLearningGoalFromDomainMutation__
 *
 * To run a mutation, you first call `useDetachLearningGoalFromDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachLearningGoalFromDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachLearningGoalFromDomainMutation, { data, loading, error }] = useDetachLearningGoalFromDomainMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *      domainId: // value for 'domainId'
 *   },
 * });
 */
export function useDetachLearningGoalFromDomainMutation(baseOptions?: Apollo.MutationHookOptions<DetachLearningGoalFromDomainMutation, DetachLearningGoalFromDomainMutationVariables>) {
        return Apollo.useMutation<DetachLearningGoalFromDomainMutation, DetachLearningGoalFromDomainMutationVariables>(Operations.detachLearningGoalFromDomain, baseOptions);
      }
export type DetachLearningGoalFromDomainMutationHookResult = ReturnType<typeof useDetachLearningGoalFromDomainMutation>;
export type DetachLearningGoalFromDomainMutationResult = Apollo.MutationResult<DetachLearningGoalFromDomainMutation>;
export type DetachLearningGoalFromDomainMutationOptions = Apollo.BaseMutationOptions<DetachLearningGoalFromDomainMutation, DetachLearningGoalFromDomainMutationVariables>;