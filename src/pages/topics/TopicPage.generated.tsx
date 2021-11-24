import * as Types from '../../graphql/types';

import { MapVisualisationTopicDataFragment } from '../../components/topics/SubTopicsMapVisualisation.generated';
import * as Operations from './TopicPage';
import * as Apollo from '@apollo/client';
export type GetTopicByKeyDomainPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetTopicByKeyDomainPageQuery = (
  { __typename?: 'Query' }
  & { getTopicByKey: (
    { __typename?: 'Topic' }
    & { parentTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
    )> }
    & MapVisualisationTopicDataFragment
  ) }
);



/**
 * __useGetTopicByKeyDomainPageQuery__
 *
 * To run a query within a React component, call `useGetTopicByKeyDomainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByKeyDomainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByKeyDomainPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetTopicByKeyDomainPageQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByKeyDomainPageQuery, GetTopicByKeyDomainPageQueryVariables>) {
        return Apollo.useQuery<GetTopicByKeyDomainPageQuery, GetTopicByKeyDomainPageQueryVariables>(Operations.getTopicByKeyDomainPage, baseOptions);
      }
export function useGetTopicByKeyDomainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByKeyDomainPageQuery, GetTopicByKeyDomainPageQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicByKeyDomainPageQuery, GetTopicByKeyDomainPageQueryVariables>(Operations.getTopicByKeyDomainPage, baseOptions);
        }
export type GetTopicByKeyDomainPageQueryHookResult = ReturnType<typeof useGetTopicByKeyDomainPageQuery>;
export type GetTopicByKeyDomainPageLazyQueryHookResult = ReturnType<typeof useGetTopicByKeyDomainPageLazyQuery>;
export type GetTopicByKeyDomainPageQueryResult = Apollo.QueryResult<GetTopicByKeyDomainPageQuery, GetTopicByKeyDomainPageQueryVariables>;