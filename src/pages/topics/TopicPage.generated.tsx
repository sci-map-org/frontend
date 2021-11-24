import * as Types from '../../graphql/types';

import { MapVisualisationTopicDataFragment } from '../../components/topics/SubTopicsMapVisualisation.generated';
import * as Operations from './TopicPage';
import * as Apollo from '@apollo/client';
export type GetTopicByKeyTopicPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetTopicByKeyTopicPageQuery = (
  { __typename?: 'Query' }
  & { getTopicByKey: (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, '_id' | 'name' | 'description'>
    & { parentTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id' | 'name'>
    )> }
    & MapVisualisationTopicDataFragment
  ) }
);



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
        return Apollo.useQuery<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>(Operations.getTopicByKeyTopicPage, baseOptions);
      }
export function useGetTopicByKeyTopicPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>(Operations.getTopicByKeyTopicPage, baseOptions);
        }
export type GetTopicByKeyTopicPageQueryHookResult = ReturnType<typeof useGetTopicByKeyTopicPageQuery>;
export type GetTopicByKeyTopicPageLazyQueryHookResult = ReturnType<typeof useGetTopicByKeyTopicPageLazyQuery>;
export type GetTopicByKeyTopicPageQueryResult = Apollo.QueryResult<GetTopicByKeyTopicPageQuery, GetTopicByKeyTopicPageQueryVariables>;