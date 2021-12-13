import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { LearningMaterialWithCoveredTopicsData_Resource_Fragment, LearningMaterialWithCoveredTopicsData_LearningPath_Fragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import * as Operations from './EditableLearningMaterialCoveredTopics';
import * as Apollo from '@apollo/client';
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

export type EditableLearningMaterialPrerequisitesDataFragment = EditableLearningMaterialPrerequisitesData_Resource_Fragment | EditableLearningMaterialPrerequisitesData_LearningPath_Fragment;

export type AttachLearningMaterialCoversTopicsMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  topicsIds: Array<Types.Scalars['String']>;
}>;


export type AttachLearningMaterialCoversTopicsMutation = (
  { __typename?: 'Mutation' }
  & { attachLearningMaterialCoversTopics: (
    { __typename?: 'Resource' }
    & LearningMaterialWithCoveredTopicsData_Resource_Fragment
  ) | (
    { __typename?: 'LearningPath' }
    & LearningMaterialWithCoveredTopicsData_LearningPath_Fragment
  ) }
);

export type DetachLearningMaterialCoversTopicsMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  topicsIds: Array<Types.Scalars['String']>;
}>;


export type DetachLearningMaterialCoversTopicsMutation = (
  { __typename?: 'Mutation' }
  & { detachLearningMaterialCoversTopics: (
    { __typename?: 'Resource' }
    & LearningMaterialWithCoveredTopicsData_Resource_Fragment
  ) | (
    { __typename?: 'LearningPath' }
    & LearningMaterialWithCoveredTopicsData_LearningPath_Fragment
  ) }
);


export type AttachLearningMaterialCoversTopicsMutationFn = Apollo.MutationFunction<AttachLearningMaterialCoversTopicsMutation, AttachLearningMaterialCoversTopicsMutationVariables>;

/**
 * __useAttachLearningMaterialCoversTopicsMutation__
 *
 * To run a mutation, you first call `useAttachLearningMaterialCoversTopicsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachLearningMaterialCoversTopicsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachLearningMaterialCoversTopicsMutation, { data, loading, error }] = useAttachLearningMaterialCoversTopicsMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      topicsIds: // value for 'topicsIds'
 *   },
 * });
 */
export function useAttachLearningMaterialCoversTopicsMutation(baseOptions?: Apollo.MutationHookOptions<AttachLearningMaterialCoversTopicsMutation, AttachLearningMaterialCoversTopicsMutationVariables>) {
        return Apollo.useMutation<AttachLearningMaterialCoversTopicsMutation, AttachLearningMaterialCoversTopicsMutationVariables>(Operations.attachLearningMaterialCoversTopics, baseOptions);
      }
export type AttachLearningMaterialCoversTopicsMutationHookResult = ReturnType<typeof useAttachLearningMaterialCoversTopicsMutation>;
export type AttachLearningMaterialCoversTopicsMutationResult = Apollo.MutationResult<AttachLearningMaterialCoversTopicsMutation>;
export type AttachLearningMaterialCoversTopicsMutationOptions = Apollo.BaseMutationOptions<AttachLearningMaterialCoversTopicsMutation, AttachLearningMaterialCoversTopicsMutationVariables>;
export type DetachLearningMaterialCoversTopicsMutationFn = Apollo.MutationFunction<DetachLearningMaterialCoversTopicsMutation, DetachLearningMaterialCoversTopicsMutationVariables>;

/**
 * __useDetachLearningMaterialCoversTopicsMutation__
 *
 * To run a mutation, you first call `useDetachLearningMaterialCoversTopicsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachLearningMaterialCoversTopicsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachLearningMaterialCoversTopicsMutation, { data, loading, error }] = useDetachLearningMaterialCoversTopicsMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      topicsIds: // value for 'topicsIds'
 *   },
 * });
 */
export function useDetachLearningMaterialCoversTopicsMutation(baseOptions?: Apollo.MutationHookOptions<DetachLearningMaterialCoversTopicsMutation, DetachLearningMaterialCoversTopicsMutationVariables>) {
        return Apollo.useMutation<DetachLearningMaterialCoversTopicsMutation, DetachLearningMaterialCoversTopicsMutationVariables>(Operations.detachLearningMaterialCoversTopics, baseOptions);
      }
export type DetachLearningMaterialCoversTopicsMutationHookResult = ReturnType<typeof useDetachLearningMaterialCoversTopicsMutation>;
export type DetachLearningMaterialCoversTopicsMutationResult = Apollo.MutationResult<DetachLearningMaterialCoversTopicsMutation>;
export type DetachLearningMaterialCoversTopicsMutationOptions = Apollo.BaseMutationOptions<DetachLearningMaterialCoversTopicsMutation, DetachLearningMaterialCoversTopicsMutationVariables>;