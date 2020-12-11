import * as Types from '../../graphql/types';

import { LearningGoalBadgeDataFragment } from '../learning_goals/LearningGoalBadge.generated';
import * as Operations from './EditableLearningMaterialOutcomes';
import * as Apollo from '@apollo/client';
export type EditableLearningMaterialOutcomesData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { outcomes?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialOutcomeItem' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id' | 'name' | 'key'>
    ) }
  )>> }
);

export type EditableLearningMaterialOutcomesData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
  & { outcomes?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialOutcomeItem' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id' | 'name' | 'key'>
    ) }
  )>> }
);

export type EditableLearningMaterialOutcomesDataFragment = EditableLearningMaterialOutcomesData_Resource_Fragment | EditableLearningMaterialOutcomesData_LearningPath_Fragment;

export type AddLearningMaterialOutcomeMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  outcomeLearningGoalId: Types.Scalars['String'];
}>;


export type AddLearningMaterialOutcomeMutation = (
  { __typename?: 'Mutation' }
  & { addLearningMaterialOutcome: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { outcomes?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialOutcomeItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { outcomes?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialOutcomeItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) }
);

export type RemoveLearningMaterialOutcomeMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  outcomeLearningGoalId: Types.Scalars['String'];
}>;


export type RemoveLearningMaterialOutcomeMutation = (
  { __typename?: 'Mutation' }
  & { removeLearningMaterialOutcome: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { outcomes?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialOutcomeItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { outcomes?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialOutcomeItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) }
);


export type AddLearningMaterialOutcomeMutationFn = Apollo.MutationFunction<AddLearningMaterialOutcomeMutation, AddLearningMaterialOutcomeMutationVariables>;

/**
 * __useAddLearningMaterialOutcomeMutation__
 *
 * To run a mutation, you first call `useAddLearningMaterialOutcomeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLearningMaterialOutcomeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLearningMaterialOutcomeMutation, { data, loading, error }] = useAddLearningMaterialOutcomeMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      outcomeLearningGoalId: // value for 'outcomeLearningGoalId'
 *   },
 * });
 */
export function useAddLearningMaterialOutcomeMutation(baseOptions?: Apollo.MutationHookOptions<AddLearningMaterialOutcomeMutation, AddLearningMaterialOutcomeMutationVariables>) {
        return Apollo.useMutation<AddLearningMaterialOutcomeMutation, AddLearningMaterialOutcomeMutationVariables>(Operations.addLearningMaterialOutcome, baseOptions);
      }
export type AddLearningMaterialOutcomeMutationHookResult = ReturnType<typeof useAddLearningMaterialOutcomeMutation>;
export type AddLearningMaterialOutcomeMutationResult = Apollo.MutationResult<AddLearningMaterialOutcomeMutation>;
export type AddLearningMaterialOutcomeMutationOptions = Apollo.BaseMutationOptions<AddLearningMaterialOutcomeMutation, AddLearningMaterialOutcomeMutationVariables>;
export type RemoveLearningMaterialOutcomeMutationFn = Apollo.MutationFunction<RemoveLearningMaterialOutcomeMutation, RemoveLearningMaterialOutcomeMutationVariables>;

/**
 * __useRemoveLearningMaterialOutcomeMutation__
 *
 * To run a mutation, you first call `useRemoveLearningMaterialOutcomeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLearningMaterialOutcomeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLearningMaterialOutcomeMutation, { data, loading, error }] = useRemoveLearningMaterialOutcomeMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      outcomeLearningGoalId: // value for 'outcomeLearningGoalId'
 *   },
 * });
 */
export function useRemoveLearningMaterialOutcomeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLearningMaterialOutcomeMutation, RemoveLearningMaterialOutcomeMutationVariables>) {
        return Apollo.useMutation<RemoveLearningMaterialOutcomeMutation, RemoveLearningMaterialOutcomeMutationVariables>(Operations.removeLearningMaterialOutcome, baseOptions);
      }
export type RemoveLearningMaterialOutcomeMutationHookResult = ReturnType<typeof useRemoveLearningMaterialOutcomeMutation>;
export type RemoveLearningMaterialOutcomeMutationResult = Apollo.MutationResult<RemoveLearningMaterialOutcomeMutation>;
export type RemoveLearningMaterialOutcomeMutationOptions = Apollo.BaseMutationOptions<RemoveLearningMaterialOutcomeMutation, RemoveLearningMaterialOutcomeMutationVariables>;