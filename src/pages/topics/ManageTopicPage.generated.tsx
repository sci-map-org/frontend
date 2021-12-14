import * as Types from '../../graphql/types';

import * as Operations from './ManageTopicPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTopicByKeyManageTopicPageQueryVariables = Types.Exact<{
  topicKey: Types.Scalars['String'];
}>;


export type GetTopicByKeyManageTopicPageQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', description?: string | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', index: number, relationshipType: Types.SubTopicRelationshipType, subTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } }> | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined, contextTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };



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