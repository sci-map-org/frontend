import * as Types from '../../graphql/types';

import * as Operations from './LearningGoalStarsRater';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RateLearningGoalMutationVariables = Types.Exact<{
  learningGoalId: Types.Scalars['String'];
  value: Types.Scalars['Float'];
}>;


export type RateLearningGoalMutation = { __typename?: 'Mutation', rateLearningGoal: { __typename?: 'LearningGoal', _id: string, rating?: number | null | undefined } };


export type RateLearningGoalMutationFn = Apollo.MutationFunction<RateLearningGoalMutation, RateLearningGoalMutationVariables>;

/**
 * __useRateLearningGoalMutation__
 *
 * To run a mutation, you first call `useRateLearningGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateLearningGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateLearningGoalMutation, { data, loading, error }] = useRateLearningGoalMutation({
 *   variables: {
 *      learningGoalId: // value for 'learningGoalId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useRateLearningGoalMutation(baseOptions?: Apollo.MutationHookOptions<RateLearningGoalMutation, RateLearningGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateLearningGoalMutation, RateLearningGoalMutationVariables>(Operations.rateLearningGoal, options);
      }
export type RateLearningGoalMutationHookResult = ReturnType<typeof useRateLearningGoalMutation>;
export type RateLearningGoalMutationResult = Apollo.MutationResult<RateLearningGoalMutation>;
export type RateLearningGoalMutationOptions = Apollo.BaseMutationOptions<RateLearningGoalMutation, RateLearningGoalMutationVariables>;