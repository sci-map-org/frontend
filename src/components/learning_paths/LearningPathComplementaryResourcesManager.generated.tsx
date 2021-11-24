import * as Types from '../../graphql/types';

import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './LearningPathComplementaryResourcesManager';
import * as Apollo from '@apollo/client';
export type AddComplementaryResourceToLearningPathMutationVariables = Types.Exact<{
  learningPathId: Types.Scalars['String'];
  resourceId: Types.Scalars['String'];
}>;


export type AddComplementaryResourceToLearningPathMutation = (
  { __typename?: 'Mutation' }
  & { addComplementaryResourceToLearningPath: (
    { __typename?: 'ComplementaryResourceUpdatedResult' }
    & { learningPath: (
      { __typename?: 'LearningPath' }
      & { complementaryResources?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & Pick<Types.Resource, '_id'>
      )>> }
      & LearningPathDataFragment
    ), resource: (
      { __typename?: 'Resource' }
      & ResourceDataFragment
    ) }
  ) }
);

export type RemoveComplementaryResourceFromLearningPathMutationVariables = Types.Exact<{
  learningPathId: Types.Scalars['String'];
  resourceId: Types.Scalars['String'];
}>;


export type RemoveComplementaryResourceFromLearningPathMutation = (
  { __typename?: 'Mutation' }
  & { removeComplementaryResourceFromLearningPath: (
    { __typename?: 'ComplementaryResourceUpdatedResult' }
    & { learningPath: (
      { __typename?: 'LearningPath' }
      & { complementaryResources?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & Pick<Types.Resource, '_id'>
      )>> }
      & LearningPathDataFragment
    ) }
  ) }
);


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
        return Apollo.useMutation<AddComplementaryResourceToLearningPathMutation, AddComplementaryResourceToLearningPathMutationVariables>(Operations.addComplementaryResourceToLearningPath, baseOptions);
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
        return Apollo.useMutation<RemoveComplementaryResourceFromLearningPathMutation, RemoveComplementaryResourceFromLearningPathMutationVariables>(Operations.removeComplementaryResourceFromLearningPath, baseOptions);
      }
export type RemoveComplementaryResourceFromLearningPathMutationHookResult = ReturnType<typeof useRemoveComplementaryResourceFromLearningPathMutation>;
export type RemoveComplementaryResourceFromLearningPathMutationResult = Apollo.MutationResult<RemoveComplementaryResourceFromLearningPathMutation>;
export type RemoveComplementaryResourceFromLearningPathMutationOptions = Apollo.BaseMutationOptions<RemoveComplementaryResourceFromLearningPathMutation, RemoveComplementaryResourceFromLearningPathMutationVariables>;