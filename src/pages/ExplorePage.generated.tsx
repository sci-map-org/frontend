import * as Types from '../graphql/types';

import { DomainLinkDataFragment, DomainDataFragment } from '../graphql/domains/domains.fragments.generated';
import { ConceptLinkDataFragment } from '../graphql/concepts/concepts.fragments.generated';
import { LearningGoalLinkDataFragment } from '../graphql/learning_goals/learning_goals.fragments.generated';
import * as Operations from './ExplorePage';
import * as Apollo from '@apollo/client';
export type GetTopicByIdExplorePageQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type GetTopicByIdExplorePageQuery = (
  { __typename?: 'Query' }
  & { getTopicById: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key' | 'name' | 'description' | 'size' | 'topicType'>
    & { parentTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { parentTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, 'topicType'>
        & DomainLinkDataFragment
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, 'topicType'>
        & ConceptLinkDataFragment
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'topicType'>
        & LearningGoalLinkDataFragment
      ) }
    )>>, subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { subTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key' | 'name' | 'size' | 'topicType'>
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'key' | 'name' | 'size' | 'topicType'>
        & { domain?: Types.Maybe<(
          { __typename?: 'Domain' }
          & DomainLinkDataFragment
        )> }
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'type' | '_id' | 'key' | 'name' | 'size' | 'topicType'>
      ) }
    )>> }
  ) | (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id' | 'key' | 'name' | 'description' | 'size' | 'topicType'>
    & { domain?: Types.Maybe<(
      { __typename?: 'Domain' }
      & DomainLinkDataFragment
    )>, parentTopic?: Types.Maybe<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { parentTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, 'topicType'>
        & DomainLinkDataFragment
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, 'topicType'>
        & ConceptLinkDataFragment
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'topicType'>
        & LearningGoalLinkDataFragment
      ) }
    )>, subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { subTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key' | 'name' | 'size' | 'topicType'>
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'key' | 'name' | 'size' | 'topicType'>
        & { domain?: Types.Maybe<(
          { __typename?: 'Domain' }
          & DomainLinkDataFragment
        )> }
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'type' | '_id' | 'key' | 'name' | 'size' | 'topicType'>
      ) }
    )>> }
  ) | (
    { __typename?: 'LearningGoal' }
    & Pick<Types.LearningGoal, 'type' | '_id' | 'key' | 'name' | 'description' | 'size' | 'topicType'>
    & { domain?: Types.Maybe<(
      { __typename?: 'LearningGoalBelongsToDomain' }
      & { domain: (
        { __typename?: 'Domain' }
        & DomainLinkDataFragment
      ) }
    )>, parentTopic?: Types.Maybe<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { parentTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, 'topicType'>
        & DomainLinkDataFragment
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, 'topicType'>
        & ConceptLinkDataFragment
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'topicType'>
        & LearningGoalLinkDataFragment
      ) }
    )>, subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { subTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key' | 'name' | 'size' | 'topicType'>
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'key' | 'name' | 'size' | 'topicType'>
        & { domain?: Types.Maybe<(
          { __typename?: 'Domain' }
          & DomainLinkDataFragment
        )> }
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'type' | '_id' | 'key' | 'name' | 'size' | 'topicType'>
      ) }
    )>> }
  ) }
);

export type GetTopLevelDomainsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTopLevelDomainsQuery = (
  { __typename?: 'Query' }
  & { getTopLevelDomains: (
    { __typename?: 'GetTopLevelDomainsResults' }
    & { items: Array<(
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id' | 'key' | 'name' | 'size' | 'topicType'>
    )> }
  ) }
);



/**
 * __useGetTopicByIdExplorePageQuery__
 *
 * To run a query within a React component, call `useGetTopicByIdExplorePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByIdExplorePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByIdExplorePageQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetTopicByIdExplorePageQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>) {
        return Apollo.useQuery<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>(Operations.getTopicByIdExplorePage, baseOptions);
      }
export function useGetTopicByIdExplorePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>(Operations.getTopicByIdExplorePage, baseOptions);
        }
export type GetTopicByIdExplorePageQueryHookResult = ReturnType<typeof useGetTopicByIdExplorePageQuery>;
export type GetTopicByIdExplorePageLazyQueryHookResult = ReturnType<typeof useGetTopicByIdExplorePageLazyQuery>;
export type GetTopicByIdExplorePageQueryResult = Apollo.QueryResult<GetTopicByIdExplorePageQuery, GetTopicByIdExplorePageQueryVariables>;

/**
 * __useGetTopLevelDomainsQuery__
 *
 * To run a query within a React component, call `useGetTopLevelDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopLevelDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopLevelDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopLevelDomainsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>) {
        return Apollo.useQuery<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>(Operations.getTopLevelDomains, baseOptions);
      }
export function useGetTopLevelDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>) {
          return Apollo.useLazyQuery<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>(Operations.getTopLevelDomains, baseOptions);
        }
export type GetTopLevelDomainsQueryHookResult = ReturnType<typeof useGetTopLevelDomainsQuery>;
export type GetTopLevelDomainsLazyQueryHookResult = ReturnType<typeof useGetTopLevelDomainsLazyQuery>;
export type GetTopLevelDomainsQueryResult = Apollo.QueryResult<GetTopLevelDomainsQuery, GetTopLevelDomainsQueryVariables>;