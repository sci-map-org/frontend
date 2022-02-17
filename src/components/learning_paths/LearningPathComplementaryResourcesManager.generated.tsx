import * as Types from '../../graphql/types';

import * as Operations from './LearningPathComplementaryResourcesManager';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddComplementaryResourceToLearningPathMutationVariables = Types.Exact<{
  learningPathId: Types.Scalars['String'];
  resourceId: Types.Scalars['String'];
}>;


export type AddComplementaryResourceToLearningPathMutation = { __typename?: 'Mutation', addComplementaryResourceToLearningPath: { __typename?: 'ComplementaryResourceUpdatedResult', learningPath: { __typename?: 'LearningPath', _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, complementaryResources?: Array<{ __typename?: 'Resource', _id: string }> | null | undefined }, resource: { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } } };

export type RemoveComplementaryResourceFromLearningPathMutationVariables = Types.Exact<{
  learningPathId: Types.Scalars['String'];
  resourceId: Types.Scalars['String'];
}>;


export type RemoveComplementaryResourceFromLearningPathMutation = { __typename?: 'Mutation', removeComplementaryResourceFromLearningPath: { __typename?: 'ComplementaryResourceUpdatedResult', learningPath: { __typename?: 'LearningPath', _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, complementaryResources?: Array<{ __typename?: 'Resource', _id: string }> | null | undefined } } };


export type AddComplementaryResourceToLearningPathMutationFn = Apollo.MutationFunction<AddComplementaryResourceToLearningPathMutation, AddComplementaryResourceToLearningPathMutationVariables>;

/**
 * __useAddComplementaryResourceToLearningPathMutation__
 *
 * To run a mutation, you first call `useAddComplementaryResourceToLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddComplementaryResourceToLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addComplementaryResourceToLearningPathMutation, { data, loading, error }] = useAddComplementaryResourceToLearningPathMutation({
 *   variables: {
 *      learningPathId: // value for 'learningPathId'
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useAddComplementaryResourceToLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<AddComplementaryResourceToLearningPathMutation, AddComplementaryResourceToLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddComplementaryResourceToLearningPathMutation, AddComplementaryResourceToLearningPathMutationVariables>(Operations.addComplementaryResourceToLearningPath, options);
      }
export type AddComplementaryResourceToLearningPathMutationHookResult = ReturnType<typeof useAddComplementaryResourceToLearningPathMutation>;
export type AddComplementaryResourceToLearningPathMutationResult = Apollo.MutationResult<AddComplementaryResourceToLearningPathMutation>;
export type AddComplementaryResourceToLearningPathMutationOptions = Apollo.BaseMutationOptions<AddComplementaryResourceToLearningPathMutation, AddComplementaryResourceToLearningPathMutationVariables>;
export type RemoveComplementaryResourceFromLearningPathMutationFn = Apollo.MutationFunction<RemoveComplementaryResourceFromLearningPathMutation, RemoveComplementaryResourceFromLearningPathMutationVariables>;

/**
 * __useRemoveComplementaryResourceFromLearningPathMutation__
 *
 * To run a mutation, you first call `useRemoveComplementaryResourceFromLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveComplementaryResourceFromLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeComplementaryResourceFromLearningPathMutation, { data, loading, error }] = useRemoveComplementaryResourceFromLearningPathMutation({
 *   variables: {
 *      learningPathId: // value for 'learningPathId'
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useRemoveComplementaryResourceFromLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<RemoveComplementaryResourceFromLearningPathMutation, RemoveComplementaryResourceFromLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveComplementaryResourceFromLearningPathMutation, RemoveComplementaryResourceFromLearningPathMutationVariables>(Operations.removeComplementaryResourceFromLearningPath, options);
      }
export type RemoveComplementaryResourceFromLearningPathMutationHookResult = ReturnType<typeof useRemoveComplementaryResourceFromLearningPathMutation>;
export type RemoveComplementaryResourceFromLearningPathMutationResult = Apollo.MutationResult<RemoveComplementaryResourceFromLearningPathMutation>;
export type RemoveComplementaryResourceFromLearningPathMutationOptions = Apollo.BaseMutationOptions<RemoveComplementaryResourceFromLearningPathMutation, RemoveComplementaryResourceFromLearningPathMutationVariables>;