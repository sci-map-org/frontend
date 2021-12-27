import * as Types from '../../graphql/types';

import * as Operations from './ManageTopicPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddTopicTypesToTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  topicTypes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AddTopicTypesToTopicMutation = { __typename?: 'Mutation', addTopicTypesToTopic: { __typename?: 'Topic', _id: string, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined } };

export type RemoveTopicTypesFromTopicMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  topicTypes: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type RemoveTopicTypesFromTopicMutation = { __typename?: 'Mutation', removeTopicTypesFromTopic: { __typename?: 'Topic', _id: string, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined } };

export type GetTopicByKeyManageTopicPageQueryVariables = Types.Exact<{
  topicKey: Types.Scalars['String'];
}>;


export type GetTopicByKeyManageTopicPageQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, name: string, key: string, context?: string | null | undefined, isDisambiguation?: boolean | null | undefined, description?: string | null | undefined, descriptionSourceUrl?: string | null | undefined, wikipediaPageUrl?: string | null | undefined, aliases?: Array<string> | null | undefined, level?: number | null | undefined, createdAt: any, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };


export type AddTopicTypesToTopicMutationFn = Apollo.MutationFunction<AddTopicTypesToTopicMutation, AddTopicTypesToTopicMutationVariables>;

/**
 * __useAddTopicTypesToTopicMutation__
 *
 * To run a mutation, you first call `useAddTopicTypesToTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTopicTypesToTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTopicTypesToTopicMutation, { data, loading, error }] = useAddTopicTypesToTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      topicTypes: // value for 'topicTypes'
 *   },
 * });
 */
export function useAddTopicTypesToTopicMutation(baseOptions?: Apollo.MutationHookOptions<AddTopicTypesToTopicMutation, AddTopicTypesToTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTopicTypesToTopicMutation, AddTopicTypesToTopicMutationVariables>(Operations.addTopicTypesToTopic, options);
      }
export type AddTopicTypesToTopicMutationHookResult = ReturnType<typeof useAddTopicTypesToTopicMutation>;
export type AddTopicTypesToTopicMutationResult = Apollo.MutationResult<AddTopicTypesToTopicMutation>;
export type AddTopicTypesToTopicMutationOptions = Apollo.BaseMutationOptions<AddTopicTypesToTopicMutation, AddTopicTypesToTopicMutationVariables>;
export type RemoveTopicTypesFromTopicMutationFn = Apollo.MutationFunction<RemoveTopicTypesFromTopicMutation, RemoveTopicTypesFromTopicMutationVariables>;

/**
 * __useRemoveTopicTypesFromTopicMutation__
 *
 * To run a mutation, you first call `useRemoveTopicTypesFromTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTopicTypesFromTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTopicTypesFromTopicMutation, { data, loading, error }] = useRemoveTopicTypesFromTopicMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      topicTypes: // value for 'topicTypes'
 *   },
 * });
 */
export function useRemoveTopicTypesFromTopicMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTopicTypesFromTopicMutation, RemoveTopicTypesFromTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTopicTypesFromTopicMutation, RemoveTopicTypesFromTopicMutationVariables>(Operations.removeTopicTypesFromTopic, options);
      }
export type RemoveTopicTypesFromTopicMutationHookResult = ReturnType<typeof useRemoveTopicTypesFromTopicMutation>;
export type RemoveTopicTypesFromTopicMutationResult = Apollo.MutationResult<RemoveTopicTypesFromTopicMutation>;
export type RemoveTopicTypesFromTopicMutationOptions = Apollo.BaseMutationOptions<RemoveTopicTypesFromTopicMutation, RemoveTopicTypesFromTopicMutationVariables>;

/**
 * __useGetTopicByKeyManageTopicPageQuery__
 *
 * To run a query within a React component, call `useGetTopicByKeyManageTopicPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByKeyManageTopicPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByKeyManageTopicPageQuery({
 *   variables: {
 *      topicKey: // value for 'topicKey'
 *   },
 * });
 */
export function useGetTopicByKeyManageTopicPageQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>(Operations.getTopicByKeyManageTopicPage, options);
      }
export function useGetTopicByKeyManageTopicPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>(Operations.getTopicByKeyManageTopicPage, options);
        }
export type GetTopicByKeyManageTopicPageQueryHookResult = ReturnType<typeof useGetTopicByKeyManageTopicPageQuery>;
export type GetTopicByKeyManageTopicPageLazyQueryHookResult = ReturnType<typeof useGetTopicByKeyManageTopicPageLazyQuery>;
export type GetTopicByKeyManageTopicPageQueryResult = Apollo.QueryResult<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>;