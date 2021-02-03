import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { OtherLearnersViewerUserDataFragment } from '../../components/lib/OtherLearnersViewer.generated';
import { SubGoalCardDataFragment } from '../../components/learning_goals/SubGoalCard.generated';
import { StartLearningGoalButtonDataFragment } from '../../components/learning_goals/StartLearningGoalButton.generated';
import * as Operations from './DomainLearningGoalPage';
import * as Apollo from '@apollo/client';
export type GetLearningGoalDomainLearningGoalPageQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
  contextualLearningGoalKey: Types.Scalars['String'];
}>;


export type GetLearningGoalDomainLearningGoalPageQuery = (
  { __typename?: 'Query' }
  & { getDomainLearningGoalByKey: (
    { __typename?: 'DomainAndLearningGoalResult' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainDataFragment
    ), learningGoal: (
      { __typename?: 'LearningGoal' }
      & { createdBy?: Types.Maybe<(
        { __typename?: 'User' }
        & Pick<Types.User, '_id'>
      )>, startedBy?: Types.Maybe<(
        { __typename?: 'LearningGoalStartedByResults' }
        & Pick<Types.LearningGoalStartedByResults, 'count'>
        & { items: Array<(
          { __typename?: 'LearningGoalStartedByItem' }
          & { user: (
            { __typename?: 'User' }
            & OtherLearnersViewerUserDataFragment
          ) }
        )> }
      )>, requiredSubGoals?: Types.Maybe<Array<(
        { __typename?: 'SubGoalItem' }
        & SubGoalCardDataFragment
      )>> }
      & LearningGoalDataFragment
      & StartLearningGoalButtonDataFragment
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
 *      contextualLearningGoalKey: // value for 'contextualLearningGoalKey'
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