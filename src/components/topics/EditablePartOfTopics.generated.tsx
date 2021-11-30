import * as Types from '../../graphql/types';

import { TopicBadgeDataFragment } from './TopicBadge.generated';
import * as Operations from './EditablePartOfTopics';
import * as Apollo from '@apollo/client';
export type EditablePartOfTopicsDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id'>
  & { partOfTopics?: Types.Maybe<Array<(
    { __typename?: 'TopicIsPartOfTopic' }
    & { partOfTopic: (
      { __typename?: 'Topic' }
      & TopicBadgeDataFragment
    ) }
  )>> }
);

export type AttachTopicIsPartOfTopicMutationVariables = Types.Exact<{
  partOfTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.AttachTopicIsPartOfTopicPayload;
}>;


export type AttachTopicIsPartOfTopicMutation = (
  { __typename?: 'Mutation' }
  & { attachTopicIsPartOfTopic: (
    { __typename?: 'TopicIsPartOfTopic' }
    & { partOfTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
    ), subTopic: (
      { __typename?: 'Topic' }
      & EditablePartOfTopicsDataFragment
    ) }
  ) }
);

export type DetachTopicIsPartOfTopicMutationVariables = Types.Exact<{
  partOfTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
}>;


export type DetachTopicIsPartOfTopicMutation = (
  { __typename?: 'Mutation' }
  & { detachTopicIsPartOfTopic: (
    { __typename?: 'DetachTopicIsPartOfTopicResult' }
    & { partOfTopic: (
      { __typename?: 'Topic' }
      & TopicBadgeDataFragment
    ), subTopic: (
      { __typename?: 'Topic' }
      & TopicBadgeDataFragment
      & EditablePartOfTopicsDataFragment
    ) }
  ) }
);


export type AttachTopicIsPartOfTopicMutationFn = Apollo.MutationFunction<AttachTopicIsPartOfTopicMutation, AttachTopicIsPartOfTopicMutationVariables>;

/**
 * __useAttachTopicIsPartOfTopicMutation__
 *
 * To run a mutation, you first call `useAttachTopicIsPartOfTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachTopicIsPartOfTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachTopicIsPartOfTopicMutation, { data, loading, error }] = useAttachTopicIsPartOfTopicMutation({
 *   variables: {
 *      partOfTopicId: // value for 'partOfTopicId'
 *      subTopicId: // value for 'subTopicId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAttachTopicIsPartOfTopicMutation(baseOptions?: Apollo.MutationHookOptions<AttachTopicIsPartOfTopicMutation, AttachTopicIsPartOfTopicMutationVariables>) {
        return Apollo.useMutation<AttachTopicIsPartOfTopicMutation, AttachTopicIsPartOfTopicMutationVariables>(Operations.attachTopicIsPartOfTopic, baseOptions);
      }
export type AttachTopicIsPartOfTopicMutationHookResult = ReturnType<typeof useAttachTopicIsPartOfTopicMutation>;
export type AttachTopicIsPartOfTopicMutationResult = Apollo.MutationResult<AttachTopicIsPartOfTopicMutation>;
export type AttachTopicIsPartOfTopicMutationOptions = Apollo.BaseMutationOptions<AttachTopicIsPartOfTopicMutation, AttachTopicIsPartOfTopicMutationVariables>;
export type DetachTopicIsPartOfTopicMutationFn = Apollo.MutationFunction<DetachTopicIsPartOfTopicMutation, DetachTopicIsPartOfTopicMutationVariables>;

/**
 * __useDetachTopicIsPartOfTopicMutation__
 *
 * To run a mutation, you first call `useDetachTopicIsPartOfTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachTopicIsPartOfTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachTopicIsPartOfTopicMutation, { data, loading, error }] = useDetachTopicIsPartOfTopicMutation({
 *   variables: {
 *      partOfTopicId: // value for 'partOfTopicId'
 *      subTopicId: // value for 'subTopicId'
 *   },
 * });
 */
export function useDetachTopicIsPartOfTopicMutation(baseOptions?: Apollo.MutationHookOptions<DetachTopicIsPartOfTopicMutation, DetachTopicIsPartOfTopicMutationVariables>) {
        return Apollo.useMutation<DetachTopicIsPartOfTopicMutation, DetachTopicIsPartOfTopicMutationVariables>(Operations.detachTopicIsPartOfTopic, baseOptions);
      }
export type DetachTopicIsPartOfTopicMutationHookResult = ReturnType<typeof useDetachTopicIsPartOfTopicMutation>;
export type DetachTopicIsPartOfTopicMutationResult = Apollo.MutationResult<DetachTopicIsPartOfTopicMutation>;
export type DetachTopicIsPartOfTopicMutationOptions = Apollo.BaseMutationOptions<DetachTopicIsPartOfTopicMutation, DetachTopicIsPartOfTopicMutationVariables>;