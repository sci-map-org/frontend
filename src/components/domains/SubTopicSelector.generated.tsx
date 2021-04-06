import * as Types from '../../graphql/types';

import { ConceptSubGoalCardDataFragment, LearningGoalSubGoalCardDataFragment } from '../learning_goals/SubGoalCard.generated';
import * as Operations from './SubTopicSelector';
import * as Apollo from '@apollo/client';
export type SearchSubTopicsQueryVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  options: Types.SearchTopicsOptions;
}>;


export type SearchSubTopicsQuery = (
  { __typename?: 'Query' }
  & { searchSubTopics: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id' | 'key' | 'name' | 'description'>
    ) | (
      { __typename?: 'Concept' }
      & ConceptSubGoalCardDataFragment
    ) | (
      { __typename?: 'LearningGoal' }
      & LearningGoalSubGoalCardDataFragment
    )> }
  ) }
);



/**
 * __useSearchSubTopicsQuery__
 *
 * To run a query within a React component, call `useSearchSubTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSubTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSubTopicsQuery({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchSubTopicsQuery(baseOptions: Apollo.QueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
        return Apollo.useQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, baseOptions);
      }
export function useSearchSubTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>) {
          return Apollo.useLazyQuery<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>(Operations.searchSubTopics, baseOptions);
        }
export type SearchSubTopicsQueryHookResult = ReturnType<typeof useSearchSubTopicsQuery>;
export type SearchSubTopicsLazyQueryHookResult = ReturnType<typeof useSearchSubTopicsLazyQuery>;
export type SearchSubTopicsQueryResult = Apollo.QueryResult<SearchSubTopicsQuery, SearchSubTopicsQueryVariables>;