import * as Types from '../../graphql/types';

import * as Operations from './NewLearningPath';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateLearningPathMutationVariables = Types.Exact<{
  payload: Types.CreateLearningPathPayload;
}>;


export type CreateLearningPathMutation = { __typename?: 'Mutation', createLearningPath: { __typename?: 'LearningPath', _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined } };


export type CreateLearningPathMutationFn = Apollo.MutationFunction<CreateLearningPathMutation, CreateLearningPathMutationVariables>;

/**
 * __useCreateLearningPathMutation__
 *
 * To run a mutation, you first call `useCreateLearningPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLearningPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLearningPathMutation, { data, loading, error }] = useCreateLearningPathMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateLearningPathMutation(baseOptions?: Apollo.MutationHookOptions<CreateLearningPathMutation, CreateLearningPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLearningPathMutation, CreateLearningPathMutationVariables>(Operations.createLearningPath, options);
      }
export type CreateLearningPathMutationHookResult = ReturnType<typeof useCreateLearningPathMutation>;
export type CreateLearningPathMutationResult = Apollo.MutationResult<CreateLearningPathMutation>;
export type CreateLearningPathMutationOptions = Apollo.BaseMutationOptions<CreateLearningPathMutation, CreateLearningPathMutationVariables>;