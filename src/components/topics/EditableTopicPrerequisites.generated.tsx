import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
import * as Operations from './EditableTopicPrerequisites';
import * as Apollo from '@apollo/client';
export type EditableTopicPrerequisitesDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id'>
  & { prerequisites?: Types.Maybe<Array<(
    { __typename?: 'TopicHasPrerequisiteTopic' }
    & { prerequisiteTopic: (
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    ) }
  )>> }
);

export type AddTopicHasPrerequisiteTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  prerequisiteTopicId: Types.Scalars['String'];
}>;


export type AddTopicHasPrerequisiteTopicMutation = (
  { __typename?: 'Mutation' }
  & { addTopicHasPrerequisiteTopic: (
    { __typename?: 'AddTopicHasPrerequisiteTopicResult' }
    & { topic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & { prerequisites?: Types.Maybe<Array<(
        { __typename?: 'TopicHasPrerequisiteTopic' }
        & { prerequisiteTopic: (
          { __typename?: 'Topic' }
          & TopicLinkDataFragment
        ) }
      )>> }
    ) }
  ) }
);

export type RemoveTopicHasPrerequisiteTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  prerequisiteTopicId: Types.Scalars['String'];
}>;


export type RemoveTopicHasPrerequisiteTopicMutation = (
  { __typename?: 'Mutation' }
  & { removeTopicHasPrerequisiteTopic: (
    { __typename?: 'RemoveTopicHasPrerequisiteTopicResult' }
    & { topic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & { prerequisites?: Types.Maybe<Array<(
        { __typename?: 'TopicHasPrerequisiteTopic' }
        & { prerequisiteTopic: (
          { __typename?: 'Topic' }
          & TopicLinkDataFragment
        ) }
      )>> }
    ) }
  ) }
);


export type AddTopicHasPrerequisiteTopicMutationFn = Apollo.MutationFunction<AddTopicHasPrerequisiteTopicMutation, AddTopicHasPrerequisiteTopicMutationVariables>;

/**
 * __useAddTopicHasPrerequisiteTopicMutation__
 *
 * To run a mutation, you first call `useAddTopicHasPrerequisiteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTopicHasPrerequisiteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTopicHasPrerequisiteTopicMutation, { data, loading, error }] = useAddTopicHasPrerequisiteTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      prerequisiteTopicId: // value for 'prerequisiteTopicId'
 *   },
 * });
 */
export function useAddTopicHasPrerequisiteTopicMutation(baseOptions?: Apollo.MutationHookOptions<AddTopicHasPrerequisiteTopicMutation, AddTopicHasPrerequisiteTopicMutationVariables>) {
        return Apollo.useMutation<AddTopicHasPrerequisiteTopicMutation, AddTopicHasPrerequisiteTopicMutationVariables>(Operations.addTopicHasPrerequisiteTopic, baseOptions);
      }
export type AddTopicHasPrerequisiteTopicMutationHookResult = ReturnType<typeof useAddTopicHasPrerequisiteTopicMutation>;
export type AddTopicHasPrerequisiteTopicMutationResult = Apollo.MutationResult<AddTopicHasPrerequisiteTopicMutation>;
export type AddTopicHasPrerequisiteTopicMutationOptions = Apollo.BaseMutationOptions<AddTopicHasPrerequisiteTopicMutation, AddTopicHasPrerequisiteTopicMutationVariables>;
export type RemoveTopicHasPrerequisiteTopicMutationFn = Apollo.MutationFunction<RemoveTopicHasPrerequisiteTopicMutation, RemoveTopicHasPrerequisiteTopicMutationVariables>;

/**
 * __useRemoveTopicHasPrerequisiteTopicMutation__
 *
 * To run a mutation, you first call `useRemoveTopicHasPrerequisiteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTopicHasPrerequisiteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTopicHasPrerequisiteTopicMutation, { data, loading, error }] = useRemoveTopicHasPrerequisiteTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      prerequisiteTopicId: // value for 'prerequisiteTopicId'
 *   },
 * });
 */
export function useRemoveTopicHasPrerequisiteTopicMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTopicHasPrerequisiteTopicMutation, RemoveTopicHasPrerequisiteTopicMutationVariables>) {
        return Apollo.useMutation<RemoveTopicHasPrerequisiteTopicMutation, RemoveTopicHasPrerequisiteTopicMutationVariables>(Operations.removeTopicHasPrerequisiteTopic, baseOptions);
      }
export type RemoveTopicHasPrerequisiteTopicMutationHookResult = ReturnType<typeof useRemoveTopicHasPrerequisiteTopicMutation>;
export type RemoveTopicHasPrerequisiteTopicMutationResult = Apollo.MutationResult<RemoveTopicHasPrerequisiteTopicMutation>;
export type RemoveTopicHasPrerequisiteTopicMutationOptions = Apollo.BaseMutationOptions<RemoveTopicHasPrerequisiteTopicMutation, RemoveTopicHasPrerequisiteTopicMutationVariables>;