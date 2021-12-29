import * as Types from '../../graphql/types';

import * as Operations from './ManageTopic';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateTopicTopicTypesMutationVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
  topicTypesNames: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type UpdateTopicTopicTypesMutation = { __typename?: 'Mutation', updateTopicTopicTypes: { __typename?: 'Topic', _id: string, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined } };

export type GetTopicByKeyManageTopicPageQueryVariables = Types.Exact<{
  topicKey: Types.Scalars['String'];
}>;


export type GetTopicByKeyManageTopicPageQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, name: string, key: string, context?: string | null | undefined, isDisambiguation?: boolean | null | undefined, description?: string | null | undefined, descriptionSourceUrl?: string | null | undefined, wikipediaPageUrl?: string | null | undefined, aliases?: Array<string> | null | undefined, level?: number | null | undefined, createdAt: any, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };


export type UpdateTopicTopicTypesMutationFn = Apollo.MutationFunction<UpdateTopicTopicTypesMutation, UpdateTopicTopicTypesMutationVariables>;

/**
 * __useUpdateTopicTopicTypesMutation__
 *
 * To run a mutation, you first call `useUpdateTopicTopicTypesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicTopicTypesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicTopicTypesMutation, { data, loading, error }] = useUpdateTopicTopicTypesMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      topicTypesNames: // value for 'topicTypesNames'
 *   },
 * });
 */
export function useUpdateTopicTopicTypesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicTopicTypesMutation, UpdateTopicTopicTypesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicTopicTypesMutation, UpdateTopicTopicTypesMutationVariables>(Operations.updateTopicTopicTypes, options);
      }
export type UpdateTopicTopicTypesMutationHookResult = ReturnType<typeof useUpdateTopicTopicTypesMutation>;
export type UpdateTopicTopicTypesMutationResult = Apollo.MutationResult<UpdateTopicTopicTypesMutation>;
export type UpdateTopicTopicTypesMutationOptions = Apollo.BaseMutationOptions<UpdateTopicTopicTypesMutation, UpdateTopicTopicTypesMutationVariables>;

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