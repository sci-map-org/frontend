import * as Types from '../../graphql/types';

import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { SubGoalsWrapperDataFragment } from '../../components/learning_goals/SubGoalsWrapper.generated';
import * as Operations from './LearningGoalPage';
import * as Apollo from '@apollo/client';
export type GetLearningGoalPageDataQueryVariables = Types.Exact<{
  learningGoalKey: Types.Scalars['String'];
}>;


export type GetLearningGoalPageDataQuery = (
  { __typename?: 'Query' }
  & { getLearningGoalByKey: (
    { __typename?: 'LearningGoal' }
    & { createdBy?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id'>
    )> }
    & LearningGoalDataFragment
    & SubGoalsWrapperDataFragment
  ) }
);



/**
 * __useGetLearningGoalPageDataQuery__
 *
 * To run a query within a React component, call `useGetLearningGoalPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLearningGoalPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLearningGoalPageDataQuery({
 *   variables: {
 *      learningGoalKey: // value for 'learningGoalKey'
 *   },
 * });
 */
export function useGetLearningGoalPageDataQuery(baseOptions: Apollo.QueryHookOptions<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>) {
        return Apollo.useQuery<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>(Operations.getLearningGoalPageData, baseOptions);
      }
export function useGetLearningGoalPageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>) {
          return Apollo.useLazyQuery<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>(Operations.getLearningGoalPageData, baseOptions);
        }
export type GetLearningGoalPageDataQueryHookResult = ReturnType<typeof useGetLearningGoalPageDataQuery>;
export type GetLearningGoalPageDataLazyQueryHookResult = ReturnType<typeof useGetLearningGoalPageDataLazyQuery>;
export type GetLearningGoalPageDataQueryResult = Apollo.QueryResult<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>;