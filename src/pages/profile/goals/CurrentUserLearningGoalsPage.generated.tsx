import * as Types from '../../../graphql/types';

import * as Operations from './CurrentUserLearningGoalsPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetCurrentUserLearningGoalsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserLearningGoalsPageQuery = { __typename?: 'Query', currentUser?: { __typename?: 'CurrentUser', _id: string } | null | undefined };



/**
 * __useGetCurrentUserLearningGoalsPageQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserLearningGoalsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserLearningGoalsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserLearningGoalsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserLearningGoalsPageQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserLearningGoalsPageQuery, GetCurrentUserLearningGoalsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserLearningGoalsPageQuery, GetCurrentUserLearningGoalsPageQueryVariables>(Operations.getCurrentUserLearningGoalsPage, options);
      }
export function useGetCurrentUserLearningGoalsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserLearningGoalsPageQuery, GetCurrentUserLearningGoalsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserLearningGoalsPageQuery, GetCurrentUserLearningGoalsPageQueryVariables>(Operations.getCurrentUserLearningGoalsPage, options);
        }
export type GetCurrentUserLearningGoalsPageQueryHookResult = ReturnType<typeof useGetCurrentUserLearningGoalsPageQuery>;
export type GetCurrentUserLearningGoalsPageLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLearningGoalsPageLazyQuery>;
export type GetCurrentUserLearningGoalsPageQueryResult = Apollo.QueryResult<GetCurrentUserLearningGoalsPageQuery, GetCurrentUserLearningGoalsPageQueryVariables>;