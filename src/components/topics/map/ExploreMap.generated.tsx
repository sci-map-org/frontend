import * as Types from '../../../graphql/types';

import * as Operations from './ExploreMap';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ExploreMapFocusedTopicCardDataFragment = { __typename?: 'Topic', description?: string | null | undefined, subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, level?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined };

export type GetTopicByIdExplorePageQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type GetTopicByIdExplorePageQuery = { __typename?: 'Query', getTopicById: { __typename?: 'Topic', description?: string | null | undefined, subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, level?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };

export type GetTopLevelTopicsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTopLevelTopicsQuery = { __typename?: 'Query', getTopLevelTopics: { __typename?: 'GetTopLevelTopicsResults', items: Array<{ __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined }> } };



/**
 * __useGetTopicByIdExplorePageQuery__
 *
 * To run a query within a React component, call `useGetTopicByIdExplorePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByIdExplorePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByIdExplorePageQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetTopicByIdExplorePageQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>(Operations.getTopicByIdExplorePage, options);
      }
export function useGetTopicByIdExplorePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>(Operations.getTopicByIdExplorePage, options);
        }
export type GetTopicByIdExplorePageQueryHookResult = ReturnType<typeof useGetTopicByIdExplorePageQuery>;
export type GetTopicByIdExplorePageLazyQueryHookResult = ReturnType<typeof useGetTopicByIdExplorePageLazyQuery>;
export type GetTopicByIdExplorePageQueryResult = Apollo.QueryResult<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>;

/**
 * __useGetTopLevelTopicsQuery__
 *
 * To run a query within a React component, call `useGetTopLevelTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopLevelTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopLevelTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopLevelTopicsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopLevelTopicsQuery, GetTopLevelTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopLevelTopicsQuery, GetTopLevelTopicsQueryVariables>(Operations.getTopLevelTopics, options);
      }
export function useGetTopLevelTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopLevelTopicsQuery, GetTopLevelTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopLevelTopicsQuery, GetTopLevelTopicsQueryVariables>(Operations.getTopLevelTopics, options);
        }
export type GetTopLevelTopicsQueryHookResult = ReturnType<typeof useGetTopLevelTopicsQuery>;
export type GetTopLevelTopicsLazyQueryHookResult = ReturnType<typeof useGetTopLevelTopicsLazyQuery>;
export type GetTopLevelTopicsQueryResult = Apollo.QueryResult<GetTopLevelTopicsQuery, GetTopLevelTopicsQueryVariables>;