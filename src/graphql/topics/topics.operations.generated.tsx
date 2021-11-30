import * as Types from '../types';

import { TopicLinkDataFragment, TopicFullDataFragment } from './topics.fragments.generated';
import * as Operations from './topics.operations';
import * as Apollo from '@apollo/client';
export type SearchTopicsQueryVariables = Types.Exact<{
  options: Types.SearchTopicsOptions;
}>;


export type SearchTopicsQuery = (
  { __typename?: 'Query' }
  & { searchTopics: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & TopicLinkDataFragment
    )> }
  ) }
);

export type SearchSubTopicsQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  options: Types.SearchTopicsOptions;
}>;


export type SearchSubTopicsQuery = (
  { __typename?: 'Query' }
  & { searchSubTopics: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & TopicLinkDataFragment
    )> }
  ) }
);

export type UpdateTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  payload: Types.UpdateTopicPayload;
}>;


export type UpdateTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateTopic: (
    { __typename?: 'Topic' }
    & TopicFullDataFragment
  ) }
);

export type DeleteTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type DeleteTopicMutation = (
  { __typename?: 'Mutation' }
  & { deleteTopic: (
    { __typename?: 'DeleteTopicResponse' }
    & Pick<Types.DeleteTopicResponse, '_id' | 'success'>
  ) }
);

export type CheckTopicKeyAvailabilityQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type CheckTopicKeyAvailabilityQuery = (
  { __typename?: 'Query' }
  & { checkTopicKeyAvailability: (
    { __typename?: 'CheckTopicKeyAvailabilityResult' }
    & Pick<Types.CheckTopicKeyAvailabilityResult, 'available'>
    & { existingTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id' | 'name'>
    )> }
  ) }
);

export type AttachTopicIsSubTopicOfTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.AttachTopicIsSubTopicOfTopicPayload;
}>;


export type AttachTopicIsSubTopicOfTopicMutation = (
  { __typename?: 'Mutation' }
  & { attachTopicIsSubTopicOfTopic: (
    { __typename?: 'TopicIsSubTopicOfTopic' }
    & { parentTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Topic' }
          & Pick<Types.Topic, '_id'>
        ) }
      )>> }
    ), subTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
    ) }
  ) }
);

export type UpdateTopicIsSubTopicOfTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.UpdateTopicIsSubTopicOfTopicPayload;
}>;


export type UpdateTopicIsSubTopicOfTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateTopicIsSubTopicOfTopic: (
    { __typename?: 'TopicIsSubTopicOfTopic' }
    & { parentTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Topic' }
          & Pick<Types.Topic, '_id'>
        ) }
      )>> }
    ), subTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
    ) }
  ) }
);

export type DetachTopicIsSubTopicOfTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
}>;


export type DetachTopicIsSubTopicOfTopicMutation = (
  { __typename?: 'Mutation' }
  & { detachTopicIsSubTopicOfTopic: (
    { __typename?: 'DetachTopicIsSubTopicOfTopicResult' }
    & { parentTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Topic' }
          & Pick<Types.Topic, '_id'>
        ) }
      )>> }
    ), subTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
    ) }
  ) }
);



/**
 * __useSearchTopicsQuery__
 *
 * To run a query within a React component, call `useSearchTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTopicsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchTopicsQuery(baseOptions: Apollo.QueryHookOptions<SearchTopicsQuery, SearchTopicsQueryVariables>) {
        return Apollo.useQuery<SearchTopicsQuery, SearchTopicsQueryVariables>(Operations.searchTopics, baseOptions);
      }
export function useSearchTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTopicsQuery, SearchTopicsQueryVariables>) {
          return Apollo.useLazyQuery<SearchTopicsQuery, SearchTopicsQueryVariables>(Operations.searchTopics, baseOptions);
        }
export type SearchTopicsQueryHookResult = ReturnType<typeof useSearchTopicsQuery>;
export type SearchTopicsLazyQueryHookResult = ReturnType<typeof useSearchTopicsLazyQuery>;
export type SearchTopicsQueryResult = Apollo.QueryResult<SearchTopicsQuery, SearchTopicsQueryVariables>;

/**
 * __useSearchSubTopicsQuery__
 *
 * To run a query within a React component, call `useSearchSubTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSubTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSubTopicsQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchSubTopicsQuery(baseOptions: Apollo.QueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
        return Apollo.useQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, baseOptions);
      }
export function useSearchSubTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
          return Apollo.useLazyQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, baseOptions);
        }
export type SearchSubTopicsQueryHookResult = ReturnType<typeof useSearchSubTopicsQuery>;
export type SearchSubTopicsLazyQueryHookResult = ReturnType<typeof useSearchSubTopicsLazyQuery>;
export type SearchSubTopicsQueryResult = Apollo.QueryResult<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>;
export type UpdateTopicMutationFn = Apollo.MutationFunction<UpdateTopicMutation, UpdateTopicMutationVariables>;

/**
 * __useUpdateTopicMutation__
 *
 * To run a mutation, you first call `useUpdateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicMutation, { data, loading, error }] = useUpdateTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateTopicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicMutation, UpdateTopicMutationVariables>) {
        return Apollo.useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(Operations.updateTopic, baseOptions);
      }
export type UpdateTopicMutationHookResult = ReturnType<typeof useUpdateTopicMutation>;
export type UpdateTopicMutationResult = Apollo.MutationResult<UpdateTopicMutation>;
export type UpdateTopicMutationOptions = Apollo.BaseMutationOptions<UpdateTopicMutation, UpdateTopicMutationVariables>;
export type DeleteTopicMutationFn = Apollo.MutationFunction<DeleteTopicMutation, DeleteTopicMutationVariables>;

/**
 * __useDeleteTopicMutation__
 *
 * To run a mutation, you first call `useDeleteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTopicMutation, { data, loading, error }] = useDeleteTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useDeleteTopicMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTopicMutation, DeleteTopicMutationVariables>) {
        return Apollo.useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(Operations.deleteTopic, baseOptions);
      }
export type DeleteTopicMutationHookResult = ReturnType<typeof useDeleteTopicMutation>;
export type DeleteTopicMutationResult = Apollo.MutationResult<DeleteTopicMutation>;
export type DeleteTopicMutationOptions = Apollo.BaseMutationOptions<DeleteTopicMutation, DeleteTopicMutationVariables>;

/**
 * __useCheckTopicKeyAvailabilityQuery__
 *
 * To run a query within a React component, call `useCheckTopicKeyAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckTopicKeyAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckTopicKeyAvailabilityQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useCheckTopicKeyAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>) {
        return Apollo.useQuery<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>(Operations.checkTopicKeyAvailability, baseOptions);
      }
export function useCheckTopicKeyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>) {
          return Apollo.useLazyQuery<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>(Operations.checkTopicKeyAvailability, baseOptions);
        }
export type CheckTopicKeyAvailabilityQueryHookResult = ReturnType<typeof useCheckTopicKeyAvailabilityQuery>;
export type CheckTopicKeyAvailabilityLazyQueryHookResult = ReturnType<typeof useCheckTopicKeyAvailabilityLazyQuery>;
export type CheckTopicKeyAvailabilityQueryResult = Apollo.QueryResult<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>;
export type AttachTopicIsSubTopicOfTopicMutationFn = Apollo.MutationFunction<AttachTopicIsSubTopicOfTopicMutation, AttachTopicIsSubTopicOfTopicMutationVariables>;

/**
 * __useAttachTopicIsSubTopicOfTopicMutation__
 *
 * To run a mutation, you first call `useAttachTopicIsSubTopicOfTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachTopicIsSubTopicOfTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachTopicIsSubTopicOfTopicMutation, { data, loading, error }] = useAttachTopicIsSubTopicOfTopicMutation({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      subTopicId: // value for 'subTopicId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAttachTopicIsSubTopicOfTopicMutation(baseOptions?: Apollo.MutationHookOptions<AttachTopicIsSubTopicOfTopicMutation, AttachTopicIsSubTopicOfTopicMutationVariables>) {
        return Apollo.useMutation<AttachTopicIsSubTopicOfTopicMutation, AttachTopicIsSubTopicOfTopicMutationVariables>(Operations.attachTopicIsSubTopicOfTopic, baseOptions);
      }
export type AttachTopicIsSubTopicOfTopicMutationHookResult = ReturnType<typeof useAttachTopicIsSubTopicOfTopicMutation>;
export type AttachTopicIsSubTopicOfTopicMutationResult = Apollo.MutationResult<AttachTopicIsSubTopicOfTopicMutation>;
export type AttachTopicIsSubTopicOfTopicMutationOptions = Apollo.BaseMutationOptions<AttachTopicIsSubTopicOfTopicMutation, AttachTopicIsSubTopicOfTopicMutationVariables>;
export type UpdateTopicIsSubTopicOfTopicMutationFn = Apollo.MutationFunction<UpdateTopicIsSubTopicOfTopicMutation, UpdateTopicIsSubTopicOfTopicMutationVariables>;

/**
 * __useUpdateTopicIsSubTopicOfTopicMutation__
 *
 * To run a mutation, you first call `useUpdateTopicIsSubTopicOfTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicIsSubTopicOfTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicIsSubTopicOfTopicMutation, { data, loading, error }] = useUpdateTopicIsSubTopicOfTopicMutation({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      subTopicId: // value for 'subTopicId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateTopicIsSubTopicOfTopicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicIsSubTopicOfTopicMutation, UpdateTopicIsSubTopicOfTopicMutationVariables>) {
        return Apollo.useMutation<UpdateTopicIsSubTopicOfTopicMutation, UpdateTopicIsSubTopicOfTopicMutationVariables>(Operations.updateTopicIsSubTopicOfTopic, baseOptions);
      }
export type UpdateTopicIsSubTopicOfTopicMutationHookResult = ReturnType<typeof useUpdateTopicIsSubTopicOfTopicMutation>;
export type UpdateTopicIsSubTopicOfTopicMutationResult = Apollo.MutationResult<UpdateTopicIsSubTopicOfTopicMutation>;
export type UpdateTopicIsSubTopicOfTopicMutationOptions = Apollo.BaseMutationOptions<UpdateTopicIsSubTopicOfTopicMutation, UpdateTopicIsSubTopicOfTopicMutationVariables>;
export type DetachTopicIsSubTopicOfTopicMutationFn = Apollo.MutationFunction<DetachTopicIsSubTopicOfTopicMutation, DetachTopicIsSubTopicOfTopicMutationVariables>;

/**
 * __useDetachTopicIsSubTopicOfTopicMutation__
 *
 * To run a mutation, you first call `useDetachTopicIsSubTopicOfTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachTopicIsSubTopicOfTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachTopicIsSubTopicOfTopicMutation, { data, loading, error }] = useDetachTopicIsSubTopicOfTopicMutation({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      subTopicId: // value for 'subTopicId'
 *   },
 * });
 */
export function useDetachTopicIsSubTopicOfTopicMutation(baseOptions?: Apollo.MutationHookOptions<DetachTopicIsSubTopicOfTopicMutation, DetachTopicIsSubTopicOfTopicMutationVariables>) {
        return Apollo.useMutation<DetachTopicIsSubTopicOfTopicMutation, DetachTopicIsSubTopicOfTopicMutationVariables>(Operations.detachTopicIsSubTopicOfTopic, baseOptions);
      }
export type DetachTopicIsSubTopicOfTopicMutationHookResult = ReturnType<typeof useDetachTopicIsSubTopicOfTopicMutation>;
export type DetachTopicIsSubTopicOfTopicMutationResult = Apollo.MutationResult<DetachTopicIsSubTopicOfTopicMutation>;
export type DetachTopicIsSubTopicOfTopicMutationOptions = Apollo.BaseMutationOptions<DetachTopicIsSubTopicOfTopicMutation, DetachTopicIsSubTopicOfTopicMutationVariables>;