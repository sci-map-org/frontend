import * as Types from '../../graphql/types';

import { TopicFullDataFragment, TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import * as Operations from './NewTopic';
import * as Apollo from '@apollo/client';
export type CreateTopicMutationVariables = Types.Exact<{
  payload: Types.CreateTopicPayload;
}>;


export type CreateTopicMutation = (
  { __typename?: 'Mutation' }
  & { createTopic: (
    { __typename?: 'Topic' }
    & TopicFullDataFragment
  ) }
);

export type AddSubTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  payload: Types.CreateTopicPayload;
  contextOptions?: Types.Maybe<Types.CreateTopicContextOptions>;
}>;


export type AddSubTopicMutation = (
  { __typename?: 'Mutation' }
  & { addSubTopic: (
    { __typename?: 'Topic' }
    & { parentTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
    & TopicFullDataFragment
  ) }
);


export type CreateTopicMutationFn = Apollo.MutationFunction<CreateTopicMutation, CreateTopicMutationVariables>;

/**
 * __useCreateTopicMutation__
 *
 * To run a mutation, you first call `useCreateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicMutation, { data, loading, error }] = useCreateTopicMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateTopicMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicMutation, CreateTopicMutationVariables>) {
        return Apollo.useMutation<CreateTopicMutation, CreateTopicMutationVariables>(Operations.createTopic, baseOptions);
      }
export type CreateTopicMutationHookResult = ReturnType<typeof useCreateTopicMutation>;
export type CreateTopicMutationResult = Apollo.MutationResult<CreateTopicMutation>;
export type CreateTopicMutationOptions = Apollo.BaseMutationOptions<CreateTopicMutation, CreateTopicMutationVariables>;
export type AddSubTopicMutationFn = Apollo.MutationFunction<AddSubTopicMutation, AddSubTopicMutationVariables>;

/**
 * __useAddSubTopicMutation__
 *
 * To run a mutation, you first call `useAddSubTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubTopicMutation, { data, loading, error }] = useAddSubTopicMutation({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      payload: // value for 'payload'
 *      contextOptions: // value for 'contextOptions'
 *   },
 * });
 */
export function useAddSubTopicMutation(baseOptions?: Apollo.MutationHookOptions<AddSubTopicMutation, AddSubTopicMutationVariables>) {
        return Apollo.useMutation<AddSubTopicMutation, AddSubTopicMutationVariables>(Operations.addSubTopic, baseOptions);
      }
export type AddSubTopicMutationHookResult = ReturnType<typeof useAddSubTopicMutation>;
export type AddSubTopicMutationResult = Apollo.MutationResult<AddSubTopicMutation>;
export type AddSubTopicMutationOptions = Apollo.BaseMutationOptions<AddSubTopicMutation, AddSubTopicMutationVariables>;