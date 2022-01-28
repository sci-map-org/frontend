import * as Types from '../types';

import * as Operations from './learning_paths.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type StartLearningPathMutationVariables = Types.Exact<{
  learningPathId: Types.Scalars['String'];
}>;


export type StartLearningPathMutation = { __typename?: 'Mutation', startLearningPath: { __typename?: 'LearningPathStartedResult', learningPath: { __typename?: 'LearningPath', _id: string, key: string, started?: { __typename?: 'LearningPathStarted', startedAt: any } | null | undefined }, user: { __typename?: 'CurrentUser', _id: string } } };

export type CompleteLearningPathMutationVariables = Types.Exact<{
  learningPathId: Types.Scalars['String'];
  completed: Types.Scalars['Boolean'];
}>;


export type CompleteLearningPathMutation = { __typename?: 'Mutation', completeLearningPath: { __typename?: 'LearningPathCompletedResult', learningPath: { __typename?: 'LearningPath', _id: string, key: string, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined }, user: { __typename?: 'CurrentUser', _id: string } } };

export type UpdateLearningPathMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  payload: Types.UpdateLearningPathPayload;
}>;


export type UpdateLearningPathMutation = { __typename?: 'Mutation', updateLearningPath: { __typename?: 'LearningPath', _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', description?: string | null | undefined, resource: { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, mediaType: Types.ResourceMediaType, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined } }> | null | undefined } };

export type DeleteLearningPathMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteLearningPathMutation = { __typename?: 'Mutation', deleteLearningPath: { __typename?: 'DeleteLearningPathResult', _id: string, success: boolean } };


export type StartLearningPathMutationFn = Apollo.MutationFunction<StartLearningPathMutation, StartLearningPathMutationVariables>;

/**
 * __useStartLearningPathMutation__
 *
 * To run a mutation, you first call `useStartLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startLearningPathMutation, { data, loading, error }] = useStartLearningPathMutation({
 *   variables: {
 *      learningPathId: // value for 'learningPathId'
 *   },
 * });
 */
export function useStartLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<StartLearningPathMutation, StartLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartLearningPathMutation, StartLearningPathMutationVariables>(Operations.startLearningPath, options);
      }
export type StartLearningPathMutationHookResult = ReturnType<typeof useStartLearningPathMutation>;
export type StartLearningPathMutationResult = Apollo.MutationResult<StartLearningPathMutation>;
export type StartLearningPathMutationOptions = Apollo.BaseMutationOptions<StartLearningPathMutation, StartLearningPathMutationVariables>;
export type CompleteLearningPathMutationFn = Apollo.MutationFunction<CompleteLearningPathMutation, CompleteLearningPathMutationVariables>;

/**
 * __useCompleteLearningPathMutation__
 *
 * To run a mutation, you first call `useCompleteLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeLearningPathMutation, { data, loading, error }] = useCompleteLearningPathMutation({
 *   variables: {
 *      learningPathId: // value for 'learningPathId'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useCompleteLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<CompleteLearningPathMutation, CompleteLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteLearningPathMutation, CompleteLearningPathMutationVariables>(Operations.completeLearningPath, options);
      }
export type CompleteLearningPathMutationHookResult = ReturnType<typeof useCompleteLearningPathMutation>;
export type CompleteLearningPathMutationResult = Apollo.MutationResult<CompleteLearningPathMutation>;
export type CompleteLearningPathMutationOptions = Apollo.BaseMutationOptions<CompleteLearningPathMutation, CompleteLearningPathMutationVariables>;
export type UpdateLearningPathMutationFn = Apollo.MutationFunction<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>;

/**
 * __useUpdateLearningPathMutation__
 *
 * To run a mutation, you first call `useUpdateLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLearningPathMutation, { data, loading, error }] = useUpdateLearningPathMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>(Operations.updateLearningPath, options);
      }
export type UpdateLearningPathMutationHookResult = ReturnType<typeof useUpdateLearningPathMutation>;
export type UpdateLearningPathMutationResult = Apollo.MutationResult<UpdateLearningPathMutation>;
export type UpdateLearningPathMutationOptions = Apollo.BaseMutationOptions<UpdateLearningPathMutation, UpdateLearningPathMutationVariables>;
export type DeleteLearningPathMutationFn = Apollo.MutationFunction<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>;

/**
 * __useDeleteLearningPathMutation__
 *
 * To run a mutation, you first call `useDeleteLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLearningPathMutation, { data, loading, error }] = useDeleteLearningPathMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>(Operations.deleteLearningPath, options);
      }
export type DeleteLearningPathMutationHookResult = ReturnType<typeof useDeleteLearningPathMutation>;
export type DeleteLearningPathMutationResult = Apollo.MutationResult<DeleteLearningPathMutation>;
export type DeleteLearningPathMutationOptions = Apollo.BaseMutationOptions<DeleteLearningPathMutation, DeleteLearningPathMutationVariables>;