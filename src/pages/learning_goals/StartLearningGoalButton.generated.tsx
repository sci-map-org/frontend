import * as Types from '../../graphql/types';

import * as Operations from './StartLearningGoalButton';
import * as Apollo from '@apollo/client';
export type StartLearningGoalButtonDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { started?: Types.Maybe<(
    { __typename?: 'LearningGoalStarted' }
    & Pick<Types.LearningGoalStarted, 'startedAt'>
  )> }
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
      & StartLearningGoalButtonDataFragment
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