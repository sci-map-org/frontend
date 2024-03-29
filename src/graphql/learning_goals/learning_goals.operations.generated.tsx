import * as Types from '../types';

import * as Operations from './learning_goals.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CheckLearningGoalKeyAvailabilityQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type CheckLearningGoalKeyAvailabilityQuery = { __typename?: 'Query', checkLearningGoalKeyAvailability: { __typename?: 'CheckLearningGoalKeyAvailabilityResult', available: boolean, existingLearningGoal?: { __typename?: 'LearningGoal', _id: string, name: string } | null | undefined } };

export type CreateLearningGoalMutationVariables = Types.Exact<{
  payload: Types.CreateLearningGoalPayload;
  options?: Types.InputMaybe<Types.CreateLearningGoalOptions>;
}>;


export type CreateLearningGoalMutation = { __typename?: 'Mutation', createLearningGoal: { __typename?: 'LearningGoal', _id: string, key: string, name: string, hidden: boolean, type: Types.LearningGoalType, description?: string | null | undefined, publishedAt?: any | null | undefined } };

export type UpdateLearningGoalMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  payload: Types.UpdateLearningGoalPayload;
}>;


export type UpdateLearningGoalMutation = { __typename?: 'Mutation', updateLearningGoal: { __typename?: 'LearningGoal', _id: string, key: string, name: string, hidden: boolean, type: Types.LearningGoalType, description?: string | null | undefined, publishedAt?: any | null | undefined } };

export type DeleteLearningGoalMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteLearningGoalMutation = { __typename?: 'Mutation', deleteLearningGoal: { __typename?: 'DeleteLearningGoalMutationResult', _id: string, success: boolean } };

export type AttachLearningGoalRequiresSubGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  subGoalId: Types.Scalars['String'];
  payload: Types.AttachLearningGoalRequiresSubGoalPayload;
}>;


export type AttachLearningGoalRequiresSubGoalMutation = { __typename?: 'Mutation', attachLearningGoalRequiresSubGoal: { __typename?: 'AttachLearningGoalRequiresSubGoalResult', learningGoal: { __typename?: 'LearningGoal', _id: string, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', strength: number, subGoal: { __typename?: 'LearningGoal' } | { __typename?: 'Topic', _id: string } }> | null | undefined } } };

export type DetachLearningGoalRequiresSubGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  subGoalId: Types.Scalars['String'];
}>;


export type DetachLearningGoalRequiresSubGoalMutation = { __typename?: 'Mutation', detachLearningGoalRequiresSubGoal: { __typename?: 'DetachLearningGoalRequiresSubGoalResult', learningGoal: { __typename?: 'LearningGoal', _id: string, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', strength: number, subGoal: { __typename?: 'LearningGoal' } | { __typename?: 'Topic', _id: string } }> | null | undefined } } };

export type StartLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
}>;


export type StartLearningGoalMutation = { __typename?: 'Mutation', startLearningGoal: { __typename?: 'LearningGoalStartedResult', learningGoal: { __typename?: 'LearningGoal', _id: string, started?: { __typename?: 'LearningGoalStarted', startedAt: any } | null | undefined } } };

export type PublishLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
}>;


export type PublishLearningGoalMutation = { __typename?: 'Mutation', publishLearningGoal: { __typename?: 'LearningGoalPublishedResult', learningGoal: { __typename?: 'LearningGoal', _id: string, publishedAt?: any | null | undefined, hidden: boolean, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', subGoal: { __typename?: 'LearningGoal', _id: string, publishedAt?: any | null | undefined, hidden: boolean } | { __typename?: 'Topic' } }> | null | undefined } } };

export type IndexLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
}>;


export type IndexLearningGoalMutation = { __typename?: 'Mutation', indexLearningGoal: { __typename?: 'LearningGoalIndexedResult', learningGoal: { __typename?: 'LearningGoal', _id: string, hidden: boolean } } };

export type AttachLearningGoalDependencyMutationVariables = Types.Exact<{
  parentLearningGoalId: Types.Scalars['String'];
  learningGoalId: Types.Scalars['String'];
  learningGoalDependencyId: Types.Scalars['String'];
}>;


export type AttachLearningGoalDependencyMutation = { __typename?: 'Mutation', attachLearningGoalDependency: { __typename?: 'UpdateLearningGoalDependenciesResult', parentLearningGoal: { __typename?: 'LearningGoal', _id: string, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', subGoal: { __typename?: 'LearningGoal', _id: string, dependsOnLearningGoals?: Array<{ __typename?: 'DependsOnGoalItem', parentLearningGoalId: string, learningGoal: { __typename?: 'LearningGoal', _id: string } }> | null | undefined } | { __typename?: 'Topic' } }> | null | undefined }, learningGoal: { __typename?: 'LearningGoal', _id: string, dependsOnLearningGoals?: Array<{ __typename?: 'DependsOnGoalItem', parentLearningGoalId: string, learningGoal: { __typename?: 'LearningGoal', _id: string } }> | null | undefined }, learningGoalDependency: { __typename?: 'LearningGoal', _id: string, dependantLearningGoals?: Array<{ __typename?: 'DependsOnGoalItem', parentLearningGoalId: string, learningGoal: { __typename?: 'LearningGoal', _id: string } }> | null | undefined } } };

export type DetachLearningGoalDependencyMutationVariables = Types.Exact<{
  parentLearningGoalId: Types.Scalars['String'];
  learningGoalId: Types.Scalars['String'];
  learningGoalDependencyId: Types.Scalars['String'];
}>;


export type DetachLearningGoalDependencyMutation = { __typename?: 'Mutation', detachLearningGoalDependency: { __typename?: 'UpdateLearningGoalDependenciesResult', learningGoal: { __typename?: 'LearningGoal', _id: string, dependsOnLearningGoals?: Array<{ __typename?: 'DependsOnGoalItem', parentLearningGoalId: string, learningGoal: { __typename?: 'LearningGoal', _id: string } }> | null | undefined }, learningGoalDependency: { __typename?: 'LearningGoal', _id: string, dependantLearningGoals?: Array<{ __typename?: 'DependsOnGoalItem', parentLearningGoalId: string, learningGoal: { __typename?: 'LearningGoal', _id: string } }> | null | undefined } } };



/**
 * __useCheckLearningGoalKeyAvailabilityQuery__
 *
 * To run a query within a React component, call `useCheckLearningGoalKeyAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckLearningGoalKeyAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckLearningGoalKeyAvailabilityQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useCheckLearningGoalKeyAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<CheckLearningGoalKeyAvailabilityQuery, CheckLearningGoalKeyAvailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckLearningGoalKeyAvailabilityQuery, CheckLearningGoalKeyAvailabilityQueryVariables>(Operations.checkLearningGoalKeyAvailability, options);
      }
export function useCheckLearningGoalKeyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckLearningGoalKeyAvailabilityQuery, CheckLearningGoalKeyAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckLearningGoalKeyAvailabilityQuery, CheckLearningGoalKeyAvailabilityQueryVariables>(Operations.checkLearningGoalKeyAvailability, options);
        }
export type CheckLearningGoalKeyAvailabilityQueryHookResult = ReturnType<typeof useCheckLearningGoalKeyAvailabilityQuery>;
export type CheckLearningGoalKeyAvailabilityLazyQueryHookResult = ReturnType<typeof useCheckLearningGoalKeyAvailabilityLazyQuery>;
export type CheckLearningGoalKeyAvailabilityQueryResult = Apollo.QueryResult<CheckLearningGoalKeyAvailabilityQuery, CheckLearningGoalKeyAvailabilityQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLearningGoalMutation, CreateLearningGoalMutationVariables>(Operations.createLearningGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLearningGoalMutation, UpdateLearningGoalMutationVariables>(Operations.updateLearningGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLearningGoalMutation, DeleteLearningGoalMutationVariables>(Operations.deleteLearningGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachLearningGoalRequiresSubGoalMutation, AttachLearningGoalRequiresSubGoalMutationVariables>(Operations.attachLearningGoalRequiresSubGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DetachLearningGoalRequiresSubGoalMutation, DetachLearningGoalRequiresSubGoalMutationVariables>(Operations.detachLearningGoalRequiresSubGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartLearningGoalMutation, StartLearningGoalMutationVariables>(Operations.startLearningGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishLearningGoalMutation, PublishLearningGoalMutationVariables>(Operations.publishLearningGoal, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IndexLearningGoalMutation, IndexLearningGoalMutationVariables>(Operations.indexLearningGoal, options);
      }
export type IndexLearningGoalMutationHookResult = ReturnType<typeof useIndexLearningGoalMutation>;
export type IndexLearningGoalMutationResult = Apollo.MutationResult<IndexLearningGoalMutation>;
export type IndexLearningGoalMutationOptions = Apollo.BaseMutationOptions<IndexLearningGoalMutation, IndexLearningGoalMutationVariables>;
export type AttachLearningGoalDependencyMutationFn = Apollo.MutationFunction<AttachLearningGoalDependencyMutation, AttachLearningGoalDependencyMutationVariables>;

/**
 * __useAttachLearningGoalDependencyMutation__
 *
 * To run a mutation, you first call `useAttachLearningGoalDependencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachLearningGoalDependencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachLearningGoalDependencyMutation, { data, loading, error }] = useAttachLearningGoalDependencyMutation({
 *   variables: {
 *      parentLearningGoalId: // value for 'parentLearningGoalId'
 *      learningGoalId: // value for 'learningGoalId'
 *      learningGoalDependencyId: // value for 'learningGoalDependencyId'
 *   },
 * });
 */
export function useAttachLearningGoalDependencyMutation(baseOptions?: Apollo.MutationHookOptions<AttachLearningGoalDependencyMutation, AttachLearningGoalDependencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachLearningGoalDependencyMutation, AttachLearningGoalDependencyMutationVariables>(Operations.attachLearningGoalDependency, options);
      }
export type AttachLearningGoalDependencyMutationHookResult = ReturnType<typeof useAttachLearningGoalDependencyMutation>;
export type AttachLearningGoalDependencyMutationResult = Apollo.MutationResult<AttachLearningGoalDependencyMutation>;
export type AttachLearningGoalDependencyMutationOptions = Apollo.BaseMutationOptions<AttachLearningGoalDependencyMutation, AttachLearningGoalDependencyMutationVariables>;
export type DetachLearningGoalDependencyMutationFn = Apollo.MutationFunction<DetachLearningGoalDependencyMutation, DetachLearningGoalDependencyMutationVariables>;

/**
 * __useDetachLearningGoalDependencyMutation__
 *
 * To run a mutation, you first call `useDetachLearningGoalDependencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachLearningGoalDependencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachLearningGoalDependencyMutation, { data, loading, error }] = useDetachLearningGoalDependencyMutation({
 *   variables: {
 *      parentLearningGoalId: // value for 'parentLearningGoalId'
 *      learningGoalId: // value for 'learningGoalId'
 *      learningGoalDependencyId: // value for 'learningGoalDependencyId'
 *   },
 * });
 */
export function useDetachLearningGoalDependencyMutation(baseOptions?: Apollo.MutationHookOptions<DetachLearningGoalDependencyMutation, DetachLearningGoalDependencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DetachLearningGoalDependencyMutation, DetachLearningGoalDependencyMutationVariables>(Operations.detachLearningGoalDependency, options);
      }
export type DetachLearningGoalDependencyMutationHookResult = ReturnType<typeof useDetachLearningGoalDependencyMutation>;
export type DetachLearningGoalDependencyMutationResult = Apollo.MutationResult<DetachLearningGoalDependencyMutation>;
export type DetachLearningGoalDependencyMutationOptions = Apollo.BaseMutationOptions<DetachLearningGoalDependencyMutation, DetachLearningGoalDependencyMutationVariables>;