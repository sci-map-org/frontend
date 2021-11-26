import * as Types from '../../graphql/types';

import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import * as Operations from './ManageTopicPage';
import * as Apollo from '@apollo/client';
export type GetTopicByKeyManageTopicPageQueryVariables = Types.Exact<{
  topicKey: Types.Scalars['String'];
}>;


export type GetTopicByKeyManageTopicPageQuery = (
  { __typename?: 'Query' }
  & { getTopicByKey: (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, 'description'>
    & { subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
      & { subTopic: (
        { __typename?: 'Topic' }
        & TopicLinkDataFragment
      ) }
    )>>, parentTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
    & TopicLinkDataFragment
  ) }
);



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
        return Apollo.useQuery<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>(Operations.getTopicByKeyManageTopicPage, baseOptions);
      }
export function useGetTopicByKeyManageTopicPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>(Operations.getTopicByKeyManageTopicPage, baseOptions);
        }
export type GetTopicByKeyManageTopicPageQueryHookResult = ReturnType<typeof useGetTopicByKeyManageTopicPageQuery>;
export type GetTopicByKeyManageTopicPageLazyQueryHookResult = ReturnType<typeof useGetTopicByKeyManageTopicPageLazyQuery>;
export type GetTopicByKeyManageTopicPageQueryResult = Apollo.QueryResult<GetTopicByKeyManageTopicPageQuery, GetTopicByKeyManageTopicPageQueryVariables>;