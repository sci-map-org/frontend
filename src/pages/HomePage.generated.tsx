import * as Types from '../graphql/types';

import { StartedLearningPathCardDataFragment } from './home/HomeUserStartedPaths.generated';
import { ResourceMiniCardDataFragment } from '../components/resources/ResourceMiniCard.generated';
import { LearningPathPreviewCardDataFragment } from '../components/learning_paths/LearningPathPreviewCard.generated';
import * as Operations from './HomePage';
import * as Apollo from '@apollo/client';
export type GetHomePageDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHomePageDataQuery = (
  { __typename?: 'Query' }
  & { getHomePageData: (
    { __typename?: 'GetHomePageDataResults' }
    & { currentUser?: Types.Maybe<(
      { __typename?: 'CurrentUser' }
      & Pick<Types.CurrentUser, '_id' | 'key' | 'email' | 'displayName'>
      & { startedLearningPaths?: Types.Maybe<Array<(
        { __typename?: 'LearningPathStartedItem' }
        & Pick<Types.LearningPathStartedItem, 'startedAt'>
        & { learningPath: (
          { __typename?: 'LearningPath' }
          & StartedLearningPathCardDataFragment
        ) }
      )>>, consumedResources?: Types.Maybe<(
        { __typename?: 'UserConsumedResourcesResult' }
        & Pick<Types.UserConsumedResourcesResult, 'count'>
        & { items: Array<(
          { __typename?: 'UserConsumedResourceItem' }
          & Pick<Types.UserConsumedResourceItem, 'consumedAt' | 'openedAt'>
          & { resource: (
            { __typename?: 'Resource' }
            & ResourceMiniCardDataFragment
          ) }
        )> }
      )> }
    )>, recommendedLearningPaths: Array<(
      { __typename?: 'LearningPath' }
      & LearningPathPreviewCardDataFragment
    )> }
  ) }
);



/**
 * __useGetHomePageDataQuery__
 *
 * To run a query within a React component, call `useGetHomePageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomePageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomePageDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomePageDataQuery(baseOptions?: Apollo.QueryHookOptions<GetHomePageDataQuery, GetHomePageDataQueryVariables>) {
        return Apollo.useQuery<GetHomePageDataQuery, GetHomePageDataQueryVariables>(Operations.getHomePageData, baseOptions);
      }
export function useGetHomePageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHomePageDataQuery, GetHomePageDataQueryVariables>) {
          return Apollo.useLazyQuery<GetHomePageDataQuery, GetHomePageDataQueryVariables>(Operations.getHomePageData, baseOptions);
        }
export type GetHomePageDataQueryHookResult = ReturnType<typeof useGetHomePageDataQuery>;
export type GetHomePageDataLazyQueryHookResult = ReturnType<typeof useGetHomePageDataLazyQuery>;
export type GetHomePageDataQueryResult = Apollo.QueryResult<GetHomePageDataQuery, GetHomePageDataQueryVariables>;