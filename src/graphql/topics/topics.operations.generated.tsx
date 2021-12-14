import * as Types from '../types';

import * as Operations from './topics.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchTopicsQueryVariables = Types.Exact<{
  options: Types.SearchTopicsOptions;
}>;


export type SearchTopicsQuery = { __typename?: 'Query', searchTopics: { __typename?: 'SearchTopicsResult', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } };

export type SearchSubTopicsQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  options: Types.SearchTopicsOptions;
}>;


export type SearchSubTopicsQuery = { __typename?: 'Query', searchSubTopics: { __typename?: 'SearchTopicsResult', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } };

export type UpdateTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  payload: Types.UpdateTopicPayload;
}>;


export type UpdateTopicMutation = { __typename?: 'Mutation', updateTopic: { __typename?: 'Topic', _id: string, name: string, key: string, context?: string | null | undefined, isDisambiguation?: boolean | null | undefined, description?: string | null | undefined, createdAt: any } };

export type DeleteTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type DeleteTopicMutation = { __typename?: 'Mutation', deleteTopic: { __typename?: 'DeleteTopicResponse', _id: string, success: boolean } };

export type CheckTopicKeyAvailabilityQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type CheckTopicKeyAvailabilityQuery = { __typename?: 'Query', checkTopicKeyAvailability: { __typename?: 'CheckTopicKeyAvailabilityResult', available: boolean, existingTopic?: { __typename?: 'Topic', _id: string, name: string } | null | undefined } };

export type AttachTopicIsSubTopicOfTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.AttachTopicIsSubTopicOfTopicPayload;
}>;


export type AttachTopicIsSubTopicOfTopicMutation = { __typename?: 'Mutation', attachTopicIsSubTopicOfTopic: { __typename?: 'TopicIsSubTopicOfTopic', parentTopic: { __typename?: 'Topic', _id: string, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, subTopic: { __typename?: 'Topic', _id: string } }> | null | undefined }, subTopic: { __typename?: 'Topic', _id: string, parentTopic?: { __typename?: 'Topic', _id: string } | null | undefined } } };

export type UpdateTopicIsSubTopicOfTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.UpdateTopicIsSubTopicOfTopicPayload;
}>;


export type UpdateTopicIsSubTopicOfTopicMutation = { __typename?: 'Mutation', updateTopicIsSubTopicOfTopic: { __typename?: 'TopicIsSubTopicOfTopic', parentTopic: { __typename?: 'Topic', _id: string, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, subTopic: { __typename?: 'Topic', _id: string } }> | null | undefined }, subTopic: { __typename?: 'Topic', _id: string, parentTopic?: { __typename?: 'Topic', _id: string } | null | undefined } } };

export type DetachTopicIsSubTopicOfTopicMutationVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
}>;


export type DetachTopicIsSubTopicOfTopicMutation = { __typename?: 'Mutation', detachTopicIsSubTopicOfTopic: { __typename?: 'DetachTopicIsSubTopicOfTopicResult', parentTopic: { __typename?: 'Topic', _id: string, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, subTopic: { __typename?: 'Topic', _id: string } }> | null | undefined }, subTopic: { __typename?: 'Topic', _id: string, parentTopic?: { __typename?: 'Topic', _id: string } | null | undefined } } };

export type AttachTopicIsPartOfTopicMutationVariables = Types.Exact<{
  partOfTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.AttachTopicIsPartOfTopicPayload;
}>;


export type AttachTopicIsPartOfTopicMutation = { __typename?: 'Mutation', attachTopicIsPartOfTopic: { __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', relationshipType: Types.SubTopicRelationshipType, index: number, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined }, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } } };

export type DetachTopicIsPartOfTopicMutationVariables = Types.Exact<{
  partOfTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
}>;


export type DetachTopicIsPartOfTopicMutation = { __typename?: 'Mutation', detachTopicIsPartOfTopic: { __typename?: 'DetachTopicIsPartOfTopicResult', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', relationshipType: Types.SubTopicRelationshipType, index: number, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined }, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } } };

export type UpdateTopicIsPartOfTopicMutationVariables = Types.Exact<{
  partOfTopicId: Types.Scalars['String'];
  subTopicId: Types.Scalars['String'];
  payload: Types.UpdateTopicIsPartOfTopicPayload;
}>;


export type UpdateTopicIsPartOfTopicMutation = { __typename?: 'Mutation', updateTopicIsPartOfTopic: { __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, subTopic: { __typename?: 'Topic', _id: string } }> | null | undefined }, subTopic: { __typename?: 'Topic', _id: string, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string } }> | null | undefined } } };

export type UpdateTopicContextMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  contextTopicId: Types.Scalars['String'];
}>;


export type UpdateTopicContextMutation = { __typename?: 'Mutation', updateTopicContext: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } };



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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTopicsQuery, SearchTopicsQueryVariables>(Operations.searchTopics, options);
      }
export function useSearchTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTopicsQuery, SearchTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTopicsQuery, SearchTopicsQueryVariables>(Operations.searchTopics, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, options);
      }
export function useSearchSubTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(Operations.updateTopic, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(Operations.deleteTopic, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>(Operations.checkTopicKeyAvailability, options);
      }
export function useCheckTopicKeyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>(Operations.checkTopicKeyAvailability, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachTopicIsSubTopicOfTopicMutation, AttachTopicIsSubTopicOfTopicMutationVariables>(Operations.attachTopicIsSubTopicOfTopic, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicIsSubTopicOfTopicMutation, UpdateTopicIsSubTopicOfTopicMutationVariables>(Operations.updateTopicIsSubTopicOfTopic, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DetachTopicIsSubTopicOfTopicMutation, DetachTopicIsSubTopicOfTopicMutationVariables>(Operations.detachTopicIsSubTopicOfTopic, options);
      }
export type DetachTopicIsSubTopicOfTopicMutationHookResult = ReturnType<typeof useDetachTopicIsSubTopicOfTopicMutation>;
export type DetachTopicIsSubTopicOfTopicMutationResult = Apollo.MutationResult<DetachTopicIsSubTopicOfTopicMutation>;
export type DetachTopicIsSubTopicOfTopicMutationOptions = Apollo.BaseMutationOptions<DetachTopicIsSubTopicOfTopicMutation, DetachTopicIsSubTopicOfTopicMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttachTopicIsPartOfTopicMutation, AttachTopicIsPartOfTopicMutationVariables>(Operations.attachTopicIsPartOfTopic, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DetachTopicIsPartOfTopicMutation, DetachTopicIsPartOfTopicMutationVariables>(Operations.detachTopicIsPartOfTopic, options);
      }
export type DetachTopicIsPartOfTopicMutationHookResult = ReturnType<typeof useDetachTopicIsPartOfTopicMutation>;
export type DetachTopicIsPartOfTopicMutationResult = Apollo.MutationResult<DetachTopicIsPartOfTopicMutation>;
export type DetachTopicIsPartOfTopicMutationOptions = Apollo.BaseMutationOptions<DetachTopicIsPartOfTopicMutation, DetachTopicIsPartOfTopicMutationVariables>;
export type UpdateTopicIsPartOfTopicMutationFn = Apollo.MutationFunction<UpdateTopicIsPartOfTopicMutation, UpdateTopicIsPartOfTopicMutationVariables>;

/**
 * __useUpdateTopicIsPartOfTopicMutation__
 *
 * To run a mutation, you first call `useUpdateTopicIsPartOfTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicIsPartOfTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicIsPartOfTopicMutation, { data, loading, error }] = useUpdateTopicIsPartOfTopicMutation({
 *   variables: {
 *      partOfTopicId: // value for 'partOfTopicId'
 *      subTopicId: // value for 'subTopicId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateTopicIsPartOfTopicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicIsPartOfTopicMutation, UpdateTopicIsPartOfTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicIsPartOfTopicMutation, UpdateTopicIsPartOfTopicMutationVariables>(Operations.updateTopicIsPartOfTopic, options);
      }
export type UpdateTopicIsPartOfTopicMutationHookResult = ReturnType<typeof useUpdateTopicIsPartOfTopicMutation>;
export type UpdateTopicIsPartOfTopicMutationResult = Apollo.MutationResult<UpdateTopicIsPartOfTopicMutation>;
export type UpdateTopicIsPartOfTopicMutationOptions = Apollo.BaseMutationOptions<UpdateTopicIsPartOfTopicMutation, UpdateTopicIsPartOfTopicMutationVariables>;
export type UpdateTopicContextMutationFn = Apollo.MutationFunction<UpdateTopicContextMutation, UpdateTopicContextMutationVariables>;

/**
 * __useUpdateTopicContextMutation__
 *
 * To run a mutation, you first call `useUpdateTopicContextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicContextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicContextMutation, { data, loading, error }] = useUpdateTopicContextMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      contextTopicId: // value for 'contextTopicId'
 *   },
 * });
 */
export function useUpdateTopicContextMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicContextMutation, UpdateTopicContextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicContextMutation, UpdateTopicContextMutationVariables>(Operations.updateTopicContext, options);
      }
export type UpdateTopicContextMutationHookResult = ReturnType<typeof useUpdateTopicContextMutation>;
export type UpdateTopicContextMutationResult = Apollo.MutationResult<UpdateTopicContextMutation>;
export type UpdateTopicContextMutationOptions = Apollo.BaseMutationOptions<UpdateTopicContextMutation, UpdateTopicContextMutationVariables>;