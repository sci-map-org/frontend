import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import * as Operations from './NewLearningGoal';
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