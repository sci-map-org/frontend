import * as Types from '../../../graphql/types';

import * as Operations from './TopicPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTopicByKeyTopicPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetTopicByKeyTopicPageQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, name: string, description?: string | null | undefined, wikipediaPageUrl?: string | null | undefined, isDisambiguation?: boolean | null | undefined, subTopicsTotalCount?: number | null | undefined, key: string, level?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, context?: string | null | undefined, subTopics?: Array<{ __typename?: 'TopicIsSubTopicOfTopic', subTopic: { __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, contextualisedTopics?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined, comments?: { __typename?: 'CommentResults', totalCount: number, items: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', childrenCount?: number | null | undefined, _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> } | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined, parentTopic?: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } | null | undefined } | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined, partOfTopics?: Array<{ __typename?: 'TopicIsPartOfTopic', partOfTopic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, disambiguationTopic?: { __typename?: 'Topic', contextualisedTopics?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined } | null | undefined } };



/**
 * __useGetTopicByKeyTopicPageQuery__
 *
 * To run a query within a React component, call `useGetTopicByKeyTopicPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByKeyTopicPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByKeyTopicPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetTopicByKeyTopicPageQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>(Operations.getTopicByKeyTopicPage, options);
      }
export function useGetTopicByKeyTopicPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>(Operations.getTopicByKeyTopicPage, options);
        }
export type GetTopicByKeyTopicPageQueryHookResult = ReturnType<typeof useGetTopicByKeyTopicPageQuery>;
export type GetTopicByKeyTopicPageLazyQueryHookResult = ReturnType<typeof useGetTopicByKeyTopicPageLazyQuery>;
export type GetTopicByKeyTopicPageQueryResult = Apollo.QueryResult<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>;