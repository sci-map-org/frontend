import * as Types from '../../../graphql/types';

import { LearningPathPreviewCardDataFragment } from '../../../components/learning_paths/LearningPathPreviewCard.generated';
import * as Operations from './CurrentUserLearningPathsPage';
import * as Apollo from '@apollo/client';
export type GetCurrentUserLearningPathsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserLearningPathsPageQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, '_id'>
    & { startedLearningPaths?: Types.Maybe<Array<(
      { __typename?: 'LearningPathStartedItem' }
      & Pick<Types.LearningPathStartedItem, 'startedAt'>
      & { learningPath: (
        { __typename?: 'LearningPath' }
        & LearningPathPreviewCardDataFragment
      ) }
    )>>, createdLearningPaths?: Types.Maybe<Array<(
      { __typename?: 'LearningPath' }
      & LearningPathPreviewCardDataFragment
    )>> }
  )> }
);



/**
 * __useGetCurrentUserLearningPathsPageQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserLearningPathsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserLearningPathsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserLearningPathsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserLearningPathsPageQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>) {
        return Apollo.useQuery<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>(Operations.getCurrentUserLearningPathsPage, baseOptions);
      }
export function useGetCurrentUserLearningPathsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>) {
          return Apollo.useLazyQuery<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>(Operations.getCurrentUserLearningPathsPage, baseOptions);
        }
export type GetCurrentUserLearningPathsPageQueryHookResult = ReturnType<typeof useGetCurrentUserLearningPathsPageQuery>;
export type GetCurrentUserLearningPathsPageLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLearningPathsPageLazyQuery>;
export type GetCurrentUserLearningPathsPageQueryResult = Apollo.QueryResult<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>;