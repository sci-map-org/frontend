import * as Types from '../../../graphql/types';

import * as Operations from './TopicNameField';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TopicSuggestionDataFragment = { __typename?: 'Topic', context?: string | null | undefined, _id: string, key: string, name: string, disambiguationTopic?: { __typename?: 'Topic', contextualisedTopics?: Array<{ __typename?: 'Topic', _id: string }> | null | undefined } | null | undefined };

export type AutocompleteTopicNameQueryVariables = Types.Exact<{
  partialName: Types.Scalars['String'];
}>;


export type AutocompleteTopicNameQuery = { __typename?: 'Query', autocompleteTopicName: { __typename?: 'SearchTopicsResult', items: Array<{ __typename?: 'Topic', context?: string | null | undefined, _id: string, key: string, name: string, disambiguationTopic?: { __typename?: 'Topic', contextualisedTopics?: Array<{ __typename?: 'Topic', _id: string }> | null | undefined } | null | undefined }> } };

export type GetTopicByIdDisambiguationModalQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type GetTopicByIdDisambiguationModalQuery = { __typename?: 'Query', getTopicById: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, disambiguationTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextualisedTopics?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };

export type CreateDisambiguationFromTopicMutationVariables = Types.Exact<{
  existingTopicId: Types.Scalars['String'];
  existingTopicContextTopicId: Types.Scalars['String'];
}>;


export type CreateDisambiguationFromTopicMutation = { __typename?: 'Mutation', createDisambiguationFromTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } };

export type GetTopicValidContextsFromDisambiguationQueryVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  disambiguationTopicId: Types.Scalars['String'];
}>;


export type GetTopicValidContextsFromDisambiguationQuery = { __typename?: 'Query', getTopicValidContextsFromDisambiguation: { __typename?: 'GetTopicValidContextsFromDisambiguation', validContexts?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } };

export type GetTopicValidContextsFromSameNameQueryVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  existingSameNameTopicId: Types.Scalars['String'];
}>;


export type GetTopicValidContextsFromSameNameQuery = { __typename?: 'Query', getTopicValidContextsFromSameName: { __typename?: 'GetTopicValidContextsFromSameName', validContexts?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined, validSameNameTopicContexts?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } };



/**
 * __useAutocompleteTopicNameQuery__
 *
 * To run a query within a React component, call `useAutocompleteTopicNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useAutocompleteTopicNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutocompleteTopicNameQuery({
 *   variables: {
 *      partialName: // value for 'partialName'
 *   },
 * });
 */
export function useAutocompleteTopicNameQuery(baseOptions: Apollo.QueryHookOptions<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>(Operations.autocompleteTopicName, options);
      }
export function useAutocompleteTopicNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>(Operations.autocompleteTopicName, options);
        }
export type AutocompleteTopicNameQueryHookResult = ReturnType<typeof useAutocompleteTopicNameQuery>;
export type AutocompleteTopicNameLazyQueryHookResult = ReturnType<typeof useAutocompleteTopicNameLazyQuery>;
export type AutocompleteTopicNameQueryResult = Apollo.QueryResult<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>;

/**
 * __useGetTopicByIdDisambiguationModalQuery__
 *
 * To run a query within a React component, call `useGetTopicByIdDisambiguationModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByIdDisambiguationModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByIdDisambiguationModalQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetTopicByIdDisambiguationModalQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>(Operations.getTopicByIdDisambiguationModal, options);
      }
export function useGetTopicByIdDisambiguationModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>(Operations.getTopicByIdDisambiguationModal, options);
        }
export type GetTopicByIdDisambiguationModalQueryHookResult = ReturnType<typeof useGetTopicByIdDisambiguationModalQuery>;
export type GetTopicByIdDisambiguationModalLazyQueryHookResult = ReturnType<typeof useGetTopicByIdDisambiguationModalLazyQuery>;
export type GetTopicByIdDisambiguationModalQueryResult = Apollo.QueryResult<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>;
export type CreateDisambiguationFromTopicMutationFn = Apollo.MutationFunction<CreateDisambiguationFromTopicMutation, CreateDisambiguationFromTopicMutationVariables>;

/**
 * __useCreateDisambiguationFromTopicMutation__
 *
 * To run a mutation, you first call `useCreateDisambiguationFromTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDisambiguationFromTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDisambiguationFromTopicMutation, { data, loading, error }] = useCreateDisambiguationFromTopicMutation({
 *   variables: {
 *      existingTopicId: // value for 'existingTopicId'
 *      existingTopicContextTopicId: // value for 'existingTopicContextTopicId'
 *   },
 * });
 */
export function useCreateDisambiguationFromTopicMutation(baseOptions?: Apollo.MutationHookOptions<CreateDisambiguationFromTopicMutation, CreateDisambiguationFromTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDisambiguationFromTopicMutation, CreateDisambiguationFromTopicMutationVariables>(Operations.createDisambiguationFromTopic, options);
      }
export type CreateDisambiguationFromTopicMutationHookResult = ReturnType<typeof useCreateDisambiguationFromTopicMutation>;
export type CreateDisambiguationFromTopicMutationResult = Apollo.MutationResult<CreateDisambiguationFromTopicMutation>;
export type CreateDisambiguationFromTopicMutationOptions = Apollo.BaseMutationOptions<CreateDisambiguationFromTopicMutation, CreateDisambiguationFromTopicMutationVariables>;

/**
 * __useGetTopicValidContextsFromDisambiguationQuery__
 *
 * To run a query within a React component, call `useGetTopicValidContextsFromDisambiguationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicValidContextsFromDisambiguationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicValidContextsFromDisambiguationQuery({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      disambiguationTopicId: // value for 'disambiguationTopicId'
 *   },
 * });
 */
export function useGetTopicValidContextsFromDisambiguationQuery(baseOptions: Apollo.QueryHookOptions<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>(Operations.getTopicValidContextsFromDisambiguation, options);
      }
export function useGetTopicValidContextsFromDisambiguationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>(Operations.getTopicValidContextsFromDisambiguation, options);
        }
export type GetTopicValidContextsFromDisambiguationQueryHookResult = ReturnType<typeof useGetTopicValidContextsFromDisambiguationQuery>;
export type GetTopicValidContextsFromDisambiguationLazyQueryHookResult = ReturnType<typeof useGetTopicValidContextsFromDisambiguationLazyQuery>;
export type GetTopicValidContextsFromDisambiguationQueryResult = Apollo.QueryResult<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>;

/**
 * __useGetTopicValidContextsFromSameNameQuery__
 *
 * To run a query within a React component, call `useGetTopicValidContextsFromSameNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicValidContextsFromSameNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicValidContextsFromSameNameQuery({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      existingSameNameTopicId: // value for 'existingSameNameTopicId'
 *   },
 * });
 */
export function useGetTopicValidContextsFromSameNameQuery(baseOptions: Apollo.QueryHookOptions<GetTopicValidContextsFromSameNameQuery, GetTopicValidContextsFromSameNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicValidContextsFromSameNameQuery, GetTopicValidContextsFromSameNameQueryVariables>(Operations.getTopicValidContextsFromSameName, options);
      }
export function useGetTopicValidContextsFromSameNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicValidContextsFromSameNameQuery, GetTopicValidContextsFromSameNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicValidContextsFromSameNameQuery, GetTopicValidContextsFromSameNameQueryVariables>(Operations.getTopicValidContextsFromSameName, options);
        }
export type GetTopicValidContextsFromSameNameQueryHookResult = ReturnType<typeof useGetTopicValidContextsFromSameNameQuery>;
export type GetTopicValidContextsFromSameNameLazyQueryHookResult = ReturnType<typeof useGetTopicValidContextsFromSameNameLazyQuery>;
export type GetTopicValidContextsFromSameNameQueryResult = Apollo.QueryResult<GetTopicValidContextsFromSameNameQuery, GetTopicValidContextsFromSameNameQueryVariables>;