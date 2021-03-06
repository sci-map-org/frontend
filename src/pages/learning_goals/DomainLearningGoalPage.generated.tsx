import * as Types from '../../graphql/types';

import { LearningGoalRoadmapDataFragment } from '../../components/learning_goals/LearningGoalRoadmap.generated';
import { DomainLinkDataFragment, DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptGroupLearningGoalDataFragment } from '../../components/learning_goals/ConceptGroupLearningGoal.generated';
import * as Operations from './DomainLearningGoalPage';
import * as Apollo from '@apollo/client';
export type GetLearningGoalDomainLearningGoalPageQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
  learningGoalKey: Types.Scalars['String'];
}>;


export type GetLearningGoalDomainLearningGoalPageQuery = (
  { __typename?: 'Query' }
  & { getDomainLearningGoalByKey: (
    { __typename?: 'DomainAndLearningGoalResult' }
    & { learningGoal: (
      { __typename?: 'LearningGoal' }
      & { domain?: Types.Maybe<(
        { __typename?: 'LearningGoalBelongsToDomain' }
        & { domain: (
          { __typename?: 'Domain' }
          & DomainLinkDataFragment
        ) }
      )> }
      & LearningGoalRoadmapDataFragment
      & ConceptGroupLearningGoalDataFragment
    ) }
  ) }
);



/**
 * __useGetLearningGoalDomainLearningGoalPageQuery__
 *
 * To run a query within a React component, call `useGetLearningGoalDomainLearningGoalPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLearningGoalDomainLearningGoalPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLearningGoalDomainLearningGoalPageQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      learningGoalKey: // value for 'learningGoalKey'
 *   },
 * });
 */
export function useGetLearningGoalDomainLearningGoalPageQuery(baseOptions: Apollo.QueryHookOptions<GetLearningGoalDomainLearningGoalPageQuery, GetLearningGoalDomainLearningGoalPageQueryVariables>) {
        return Apollo.useQuery<GetLearningGoalDomainLearningGoalPageQuery, GetLearningGoalDomainLearningGoalPageQueryVariables>(Operations.getLearningGoalDomainLearningGoalPage, baseOptions);
      }
export function useGetLearningGoalDomainLearningGoalPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLearningGoalDomainLearningGoalPageQuery, GetLearningGoalDomainLearningGoalPageQueryVariables>) {
          return Apollo.useLazyQuery<GetLearningGoalDomainLearningGoalPageQuery, GetLearningGoalDomainLearningGoalPageQueryVariables>(Operations.getLearningGoalDomainLearningGoalPage, baseOptions);
        }
export type GetLearningGoalDomainLearningGoalPageQueryHookResult = ReturnType<typeof useGetLearningGoalDomainLearningGoalPageQuery>;
export type GetLearningGoalDomainLearningGoalPageLazyQueryHookResult = ReturnType<typeof useGetLearningGoalDomainLearningGoalPageLazyQuery>;
export type GetLearningGoalDomainLearningGoalPageQueryResult = Apollo.QueryResult<GetLearningGoalDomainLearningGoalPageQuery, GetLearningGoalDomainLearningGoalPageQueryVariables>;