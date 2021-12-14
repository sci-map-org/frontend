import * as Types from '../../graphql/types';

import * as Operations from './EditableLearningMaterialCoveredTopics';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type EditableLearningMaterialPrerequisitesData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined };

export type EditableLearningMaterialPrerequisitesData_Resource_Fragment = { __typename?: 'Resource', _id: string, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined };

export type EditableLearningMaterialPrerequisitesDataFragment = EditableLearningMaterialPrerequisitesData_LearningPath_Fragment | EditableLearningMaterialPrerequisitesData_Resource_Fragment;

export type AttachLearningMaterialCoversTopicsMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  topicsIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AttachLearningMaterialCoversTopicsMutation = { __typename?: 'Mutation', attachLearningMaterialCoversTopics: { __typename?: 'LearningPath', _id: string, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } | { __typename?: 'Resource', _id: string, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } };

export type DetachLearningMaterialCoversTopicsMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  topicsIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type DetachLearningMaterialCoversTopicsMutation = { __typename?: 'Mutation', detachLearningMaterialCoversTopics: { __typename?: 'LearningPath', _id: string, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } | { __typename?: 'Resource', _id: string, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } };


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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachLearningMaterialCoversTopicsMutation, AttachLearningMaterialCoversTopicsMutationVariables>(Operations.attachLearningMaterialCoversTopics, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DetachLearningMaterialCoversTopicsMutation, DetachLearningMaterialCoversTopicsMutationVariables>(Operations.detachLearningMaterialCoversTopics, options);
      }
export type DetachLearningMaterialCoversTopicsMutationHookResult = ReturnType<typeof useDetachLearningMaterialCoversTopicsMutation>;
export type DetachLearningMaterialCoversTopicsMutationResult = Apollo.MutationResult<DetachLearningMaterialCoversTopicsMutation>;
export type DetachLearningMaterialCoversTopicsMutationOptions = Apollo.BaseMutationOptions<DetachLearningMaterialCoversTopicsMutation, DetachLearningMaterialCoversTopicsMutationVariables>;