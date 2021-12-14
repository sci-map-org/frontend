import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
import * as Operations from './EditableLearningMaterialPrerequisites';
import * as Apollo from '@apollo/client';
export type EditableLearningMaterialPrerequisitesData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
  & { prerequisites?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialHasPrerequisiteTopic' }
    & { topic: (
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    ) }
  )>> }
);

export type EditableLearningMaterialPrerequisitesData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { prerequisites?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialHasPrerequisiteTopic' }
    & { topic: (
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    ) }
  )>> }
);

export type EditableLearningMaterialPrerequisitesDataFragment = EditableLearningMaterialPrerequisitesData_LearningPath_Fragment | EditableLearningMaterialPrerequisitesData_Resource_Fragment;

export type AddLearningMaterialHasPrerequisiteTopicMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  prerequisiteTopicId: Types.Scalars['String'];
}>;


export type AddLearningMaterialHasPrerequisiteTopicMutation = (
  { __typename?: 'Mutation' }
  & { addLearningMaterialHasPrerequisiteTopic: (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialHasPrerequisiteTopic' }
      & { topic: (
        { __typename?: 'Topic' }
        & TopicLinkDataFragment
      ) }
    )>> }
  ) | (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialHasPrerequisiteTopic' }
      & { topic: (
        { __typename?: 'Topic' }
        & TopicLinkDataFragment
      ) }
    )>> }
  ) }
);

export type RemoveLearningMaterialHasPrerequisiteTopicMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  prerequisiteTopicId: Types.Scalars['String'];
}>;


export type RemoveLearningMaterialHasPrerequisiteTopicMutation = (
  { __typename?: 'Mutation' }
  & { removeLearningMaterialHasPrerequisiteTopic: (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialHasPrerequisiteTopic' }
      & { topic: (
        { __typename?: 'Topic' }
        & TopicLinkDataFragment
      ) }
    )>> }
  ) | (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { prerequisites?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialHasPrerequisiteTopic' }
      & { topic: (
        { __typename?: 'Topic' }
        & TopicLinkDataFragment
      ) }
    )>> }
  ) }
);


export type AddLearningMaterialHasPrerequisiteTopicMutationFn = Apollo.MutationFunction<AddLearningMaterialHasPrerequisiteTopicMutation, AddLearningMaterialHasPrerequisiteTopicMutationVariables>;

/**
 * __useAddLearningMaterialHasPrerequisiteTopicMutation__
 *
 * To run a mutation, you first call `useAddLearningMaterialHasPrerequisiteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLearningMaterialHasPrerequisiteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLearningMaterialHasPrerequisiteTopicMutation, { data, loading, error }] = useAddLearningMaterialHasPrerequisiteTopicMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      prerequisiteTopicId: // value for 'prerequisiteTopicId'
 *   },
 * });
 */
export function useAddLearningMaterialHasPrerequisiteTopicMutation(baseOptions?: Apollo.MutationHookOptions<AddLearningMaterialHasPrerequisiteTopicMutation, AddLearningMaterialHasPrerequisiteTopicMutationVariables>) {
        return Apollo.useMutation<AddLearningMaterialHasPrerequisiteTopicMutation, AddLearningMaterialHasPrerequisiteTopicMutationVariables>(Operations.addLearningMaterialHasPrerequisiteTopic, baseOptions);
      }
export type AddLearningMaterialHasPrerequisiteTopicMutationHookResult = ReturnType<typeof useAddLearningMaterialHasPrerequisiteTopicMutation>;
export type AddLearningMaterialHasPrerequisiteTopicMutationResult = Apollo.MutationResult<AddLearningMaterialHasPrerequisiteTopicMutation>;
export type AddLearningMaterialHasPrerequisiteTopicMutationOptions = Apollo.BaseMutationOptions<AddLearningMaterialHasPrerequisiteTopicMutation, AddLearningMaterialHasPrerequisiteTopicMutationVariables>;
export type RemoveLearningMaterialHasPrerequisiteTopicMutationFn = Apollo.MutationFunction<RemoveLearningMaterialHasPrerequisiteTopicMutation, RemoveLearningMaterialHasPrerequisiteTopicMutationVariables>;

/**
 * __useRemoveLearningMaterialHasPrerequisiteTopicMutation__
 *
 * To run a mutation, you first call `useRemoveLearningMaterialHasPrerequisiteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLearningMaterialHasPrerequisiteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLearningMaterialHasPrerequisiteTopicMutation, { data, loading, error }] = useRemoveLearningMaterialHasPrerequisiteTopicMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      prerequisiteTopicId: // value for 'prerequisiteTopicId'
 *   },
 * });
 */
export function useRemoveLearningMaterialHasPrerequisiteTopicMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLearningMaterialHasPrerequisiteTopicMutation, RemoveLearningMaterialHasPrerequisiteTopicMutationVariables>) {
        return Apollo.useMutation<RemoveLearningMaterialHasPrerequisiteTopicMutation, RemoveLearningMaterialHasPrerequisiteTopicMutationVariables>(Operations.removeLearningMaterialHasPrerequisiteTopic, baseOptions);
      }
export type RemoveLearningMaterialHasPrerequisiteTopicMutationHookResult = ReturnType<typeof useRemoveLearningMaterialHasPrerequisiteTopicMutation>;
export type RemoveLearningMaterialHasPrerequisiteTopicMutationResult = Apollo.MutationResult<RemoveLearningMaterialHasPrerequisiteTopicMutation>;
export type RemoveLearningMaterialHasPrerequisiteTopicMutationOptions = Apollo.BaseMutationOptions<RemoveLearningMaterialHasPrerequisiteTopicMutation, RemoveLearningMaterialHasPrerequisiteTopicMutationVariables>;