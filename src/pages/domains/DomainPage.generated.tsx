import * as Types from '../../graphql/types';

import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { SubTopicsMenuDataFragment } from '../../components/topics/SubTopicsMenu.generated';
import { MinimapTopicDataFragment } from '../../components/topics/SubTopicsMinimap.generated';
import { LearningGoalCardDataFragment } from '../../components/learning_goals/cards/LearningGoalCard.generated';
import * as Operations from './DomainPage';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyDomainPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & { subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & SubTopicsMenuDataFragment
      & MinimapTopicDataFragment
    )>>, parentTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
      & { parentTopic: (
        { __typename?: 'Domain' }
        & DomainLinkDataFragment
      ) | { __typename?: 'Concept' } | { __typename?: 'LearningGoal' } | { __typename?: 'Topic' } }
    )>>, learningGoals?: Types.Maybe<Array<(
      { __typename?: 'LearningGoalBelongsToDomain' }
      & Pick<Types.LearningGoalBelongsToDomain, 'index'>
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & LearningGoalCardDataFragment
      ) }
    )>> }
    & DomainDataFragment
  ) }
);



/**
 * __useGetDomainByKeyDomainPageQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyDomainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyDomainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyDomainPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyDomainPageQuery(baseOptions: Apollo.QueryHookOptions<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>) {
        return Apollo.useQuery<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>(Operations.getDomainByKeyDomainPage, baseOptions);
      }
export function useGetDomainByKeyDomainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>(Operations.getDomainByKeyDomainPage, baseOptions);
        }
export type GetDomainByKeyDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyDomainPageQuery>;
export type GetDomainByKeyDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyDomainPageLazyQuery>;
export type GetDomainByKeyDomainPageQueryResult = Apollo.QueryResult<GetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQueryVariables>;