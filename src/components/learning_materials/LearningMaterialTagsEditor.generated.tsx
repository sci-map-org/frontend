import * as Types from '../../graphql/types';

import * as Operations from './LearningMaterialTagsEditor';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddTagsToLearningMaterialMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  tags: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AddTagsToLearningMaterialMutation = { __typename?: 'Mutation', addTagsToLearningMaterial: { __typename?: 'LearningPath', _id: string, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined } | { __typename?: 'Resource', _id: string, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined } };

export type RemoveTagsFromLearningMaterialMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  tags: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type RemoveTagsFromLearningMaterialMutation = { __typename?: 'Mutation', removeTagsFromLearningMaterial: { __typename?: 'LearningPath', _id: string, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined } | { __typename?: 'Resource', _id: string, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined } };


export type AddTagsToLearningMaterialMutationFn = Apollo.MutationFunction<AddTagsToLearningMaterialMutation, AddTagsToLearningMaterialMutationVariables>;

/**
 * __useAddTagsToLearningMaterialMutation__
 *
 * To run a mutation, you first call `useAddTagsToLearningMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagsToLearningMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagsToLearningMaterialMutation, { data, loading, error }] = useAddTagsToLearningMaterialMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddTagsToLearningMaterialMutation(baseOptions?: Apollo.MutationHookOptions<AddTagsToLearningMaterialMutation, AddTagsToLearningMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagsToLearningMaterialMutation, AddTagsToLearningMaterialMutationVariables>(Operations.addTagsToLearningMaterial, options);
      }
export type AddTagsToLearningMaterialMutationHookResult = ReturnType<typeof useAddTagsToLearningMaterialMutation>;
export type AddTagsToLearningMaterialMutationResult = Apollo.MutationResult<AddTagsToLearningMaterialMutation>;
export type AddTagsToLearningMaterialMutationOptions = Apollo.BaseMutationOptions<AddTagsToLearningMaterialMutation, AddTagsToLearningMaterialMutationVariables>;
export type RemoveTagsFromLearningMaterialMutationFn = Apollo.MutationFunction<RemoveTagsFromLearningMaterialMutation, RemoveTagsFromLearningMaterialMutationVariables>;

/**
 * __useRemoveTagsFromLearningMaterialMutation__
 *
 * To run a mutation, you first call `useRemoveTagsFromLearningMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagsFromLearningMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagsFromLearningMaterialMutation, { data, loading, error }] = useRemoveTagsFromLearningMaterialMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useRemoveTagsFromLearningMaterialMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTagsFromLearningMaterialMutation, RemoveTagsFromLearningMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTagsFromLearningMaterialMutation, RemoveTagsFromLearningMaterialMutationVariables>(Operations.removeTagsFromLearningMaterial, options);
      }
export type RemoveTagsFromLearningMaterialMutationHookResult = ReturnType<typeof useRemoveTagsFromLearningMaterialMutation>;
export type RemoveTagsFromLearningMaterialMutationResult = Apollo.MutationResult<RemoveTagsFromLearningMaterialMutation>;
export type RemoveTagsFromLearningMaterialMutationOptions = Apollo.BaseMutationOptions<RemoveTagsFromLearningMaterialMutation, RemoveTagsFromLearningMaterialMutationVariables>;