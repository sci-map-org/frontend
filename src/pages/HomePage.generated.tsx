import * as Types from '../graphql/types';

import { CurrentUserDataFragment, LoginResponseDataFragment } from '../graphql/users/users.fragments.generated';
import { LearningGoalCardDataFragment } from '../components/learning_goals/cards/LearningGoalCard.generated';
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
      & CurrentUserDataFragment
    )>, recommendedLearningGoals: Array<(
      { __typename?: 'LearningGoal' }
      & LearningGoalCardDataFragment
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