import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import * as Operations from './LearningGoalSelector';
import * as Apollo from '@apollo/client';
export type SearchLearningGoalsQueryVariables = Types.Exact<{
  options: Types.SearchLearningGoalsOptions;
}>;


export type SearchLearningGoalsQuery = (
  { __typename?: 'Query' }
  & { searchLearningGoals: (
    { __typename?: 'SearchLearningGoalsResult' }
    & { items: Array<(
      { __typename?: 'LearningGoal' }
      & LearningGoalDataFragment
    )> }
  ) }
);



/**
 * __useSearchLearningGoalsQuery__
 *
 * To run a query within a React component, call `useSearchLearningGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLearningGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLearningGoalsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchLearningGoalsQuery(baseOptions: Apollo.QueryHookOptions<SearchLearningGoalsQuery, SearchLearningGoalsQueryVariables>) {
        return Apollo.useQuery<SearchLearningGoalsQuery, SearchLearningGoalsQueryVariables>(Operations.searchLearningGoals, baseOptions);
      }
export function useSearchLearningGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLearningGoalsQuery, SearchLearningGoalsQueryVariables>) {
          return Apollo.useLazyQuery<SearchLearningGoalsQuery, SearchLearningGoalsQueryVariables>(Operations.searchLearningGoals, baseOptions);
        }
export type SearchLearningGoalsQueryHookResult = ReturnType<typeof useSearchLearningGoalsQuery>;
export type SearchLearningGoalsLazyQueryHookResult = ReturnType<typeof useSearchLearningGoalsLazyQuery>;
export type SearchLearningGoalsQueryResult = Apollo.QueryResult<SearchLearningGoalsQuery, SearchLearningGoalsQueryVariables>;