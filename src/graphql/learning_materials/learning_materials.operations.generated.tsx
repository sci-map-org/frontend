import * as Types from '../types';

import * as Operations from './learning_materials.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ShowLearningMaterialInTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  learningMaterialId: Types.Scalars['String'];
}>;


export type ShowLearningMaterialInTopicMutation = { __typename?: 'Mutation', showLearningMaterialInTopic: { __typename?: 'LearningPath', _id: string, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } | { __typename?: 'Resource', _id: string, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } };

export type HideLearningMaterialFromTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  learningMaterialId: Types.Scalars['String'];
}>;


export type HideLearningMaterialFromTopicMutation = { __typename?: 'Mutation', hideLearningMaterialFromTopic: { __typename?: 'LearningPath', _id: string, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } | { __typename?: 'Resource', _id: string, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } };


export type ShowLearningMaterialInTopicMutationFn = Apollo.MutationFunction<ShowLearningMaterialInTopicMutation, ShowLearningMaterialInTopicMutationVariables>;

/**
 * __useShowLearningMaterialInTopicMutation__
 *
 * To run a mutation, you first call `useShowLearningMaterialInTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShowLearningMaterialInTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [showLearningMaterialInTopicMutation, { data, loading, error }] = useShowLearningMaterialInTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      learningMaterialId: // value for 'learningMaterialId'
 *   },
 * });
 */
export function useShowLearningMaterialInTopicMutation(baseOptions?: Apollo.MutationHookOptions<ShowLearningMaterialInTopicMutation, ShowLearningMaterialInTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShowLearningMaterialInTopicMutation, ShowLearningMaterialInTopicMutationVariables>(Operations.showLearningMaterialInTopic, options);
      }
export type ShowLearningMaterialInTopicMutationHookResult = ReturnType<typeof useShowLearningMaterialInTopicMutation>;
export type ShowLearningMaterialInTopicMutationResult = Apollo.MutationResult<ShowLearningMaterialInTopicMutation>;
export type ShowLearningMaterialInTopicMutationOptions = Apollo.BaseMutationOptions<ShowLearningMaterialInTopicMutation, ShowLearningMaterialInTopicMutationVariables>;
export type HideLearningMaterialFromTopicMutationFn = Apollo.MutationFunction<HideLearningMaterialFromTopicMutation, HideLearningMaterialFromTopicMutationVariables>;

/**
 * __useHideLearningMaterialFromTopicMutation__
 *
 * To run a mutation, you first call `useHideLearningMaterialFromTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideLearningMaterialFromTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideLearningMaterialFromTopicMutation, { data, loading, error }] = useHideLearningMaterialFromTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      learningMaterialId: // value for 'learningMaterialId'
 *   },
 * });
 */
export function useHideLearningMaterialFromTopicMutation(baseOptions?: Apollo.MutationHookOptions<HideLearningMaterialFromTopicMutation, HideLearningMaterialFromTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HideLearningMaterialFromTopicMutation, HideLearningMaterialFromTopicMutationVariables>(Operations.hideLearningMaterialFromTopic, options);
      }
export type HideLearningMaterialFromTopicMutationHookResult = ReturnType<typeof useHideLearningMaterialFromTopicMutation>;
export type HideLearningMaterialFromTopicMutationResult = Apollo.MutationResult<HideLearningMaterialFromTopicMutation>;
export type HideLearningMaterialFromTopicMutationOptions = Apollo.BaseMutationOptions<HideLearningMaterialFromTopicMutation, HideLearningMaterialFromTopicMutationVariables>;