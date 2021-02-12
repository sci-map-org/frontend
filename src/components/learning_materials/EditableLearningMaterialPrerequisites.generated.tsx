import * as Types from '../../graphql/types';

import { LearningGoalBadgeDataFragment } from '../learning_goals/LearningGoalBadge.generated';
import * as Operations from './EditableLearningMaterialPrerequisites';
import * as Apollo from '@apollo/client';
export type EditableLearningMaterialPrerequisitesData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { prerequisites?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialPrerequisiteItem' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & LearningGoalBadgeDataFragment
    ) }
  )>> }
);

export type EditableLearningMaterialPrerequisitesData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
  & { prerequisites?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialPrerequisiteItem' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & LearningGoalBadgeDataFragment
    ) }
  )>> }
);

export type EditableLearningMaterialPrerequisitesDataFragment = EditableLearningMaterialPrerequisitesData_Resource_Fragment | EditableLearningMaterialPrerequisitesData_LearningPath_Fragment;

export type AddLearningMaterialPrerequisiteMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  prerequisiteLearningGoalId: Types.Scalars['String'];
}>;


export type AddLearningMaterialPrerequisiteMutation = (
  { __typename?: 'Mutation' }
  & { addLearningMaterialPrerequisite: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialPrerequisiteItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialPrerequisiteItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) }
);

export type RemoveLearningMaterialPrerequisiteMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  prerequisiteLearningGoalId: Types.Scalars['String'];
}>;


export type RemoveLearningMaterialPrerequisiteMutation = (
  { __typename?: 'Mutation' }
  & { removeLearningMaterialPrerequisite: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialPrerequisiteItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) | (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialPrerequisiteItem' }
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalBadgeDataFragment
      ) }
    )>> }
  ) }
);


export type AddLearningMaterialPrerequisiteMutationFn = Apollo.MutationFunction<AddLearningMaterialPrerequisiteMutation, AddLearningMaterialPrerequisiteMutationVariables>;

/**
 * __useAddLearningMaterialPrerequisiteMutation__
 *
 * To run a mutation, you first call `useAddLearningMaterialPrerequisiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLearningMaterialPrerequisiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLearningMaterialPrerequisiteMutation, { data, loading, error }] = useAddLearningMaterialPrerequisiteMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      prerequisiteLearningGoalId: // value for 'prerequisiteLearningGoalId'
 *   },
 * });
 */
export function useAddLearningMaterialPrerequisiteMutation(baseOptions?: Apollo.MutationHookOptions<AddLearningMaterialPrerequisiteMutation, AddLearningMaterialPrerequisiteMutationVariables>) {
        return Apollo.useMutation<AddLearningMaterialPrerequisiteMutation, AddLearningMaterialPrerequisiteMutationVariables>(Operations.addLearningMaterialPrerequisite, baseOptions);
      }
export type AddLearningMaterialPrerequisiteMutationHookResult = ReturnType<typeof useAddLearningMaterialPrerequisiteMutation>;
export type AddLearningMaterialPrerequisiteMutationResult = Apollo.MutationResult<AddLearningMaterialPrerequisiteMutation>;
export type AddLearningMaterialPrerequisiteMutationOptions = Apollo.BaseMutationOptions<AddLearningMaterialPrerequisiteMutation, AddLearningMaterialPrerequisiteMutationVariables>;
export type RemoveLearningMaterialPrerequisiteMutationFn = Apollo.MutationFunction<RemoveLearningMaterialPrerequisiteMutation, RemoveLearningMaterialPrerequisiteMutationVariables>;

/**
 * __useRemoveLearningMaterialPrerequisiteMutation__
 *
 * To run a mutation, you first call `useRemoveLearningMaterialPrerequisiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLearningMaterialPrerequisiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLearningMaterialPrerequisiteMutation, { data, loading, error }] = useRemoveLearningMaterialPrerequisiteMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      prerequisiteLearningGoalId: // value for 'prerequisiteLearningGoalId'
 *   },
 * });
 */
export function useRemoveLearningMaterialPrerequisiteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLearningMaterialPrerequisiteMutation, RemoveLearningMaterialPrerequisiteMutationVariables>) {
        return Apollo.useMutation<RemoveLearningMaterialPrerequisiteMutation, RemoveLearningMaterialPrerequisiteMutationVariables>(Operations.removeLearningMaterialPrerequisite, baseOptions);
      }
export type RemoveLearningMaterialPrerequisiteMutationHookResult = ReturnType<typeof useRemoveLearningMaterialPrerequisiteMutation>;
export type RemoveLearningMaterialPrerequisiteMutationResult = Apollo.MutationResult<RemoveLearningMaterialPrerequisiteMutation>;
export type RemoveLearningMaterialPrerequisiteMutationOptions = Apollo.BaseMutationOptions<RemoveLearningMaterialPrerequisiteMutation, RemoveLearningMaterialPrerequisiteMutationVariables>;