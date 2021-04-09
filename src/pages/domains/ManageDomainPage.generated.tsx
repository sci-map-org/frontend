import * as Types from '../../graphql/types';

import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import * as Operations from './ManageDomainPage';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyManageDomainPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyManageDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & { subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
      & { subTopic: (
        { __typename?: 'Domain' }
        & DomainDataFragment
      ) | { __typename?: 'Concept' } | { __typename?: 'LearningGoal' } }
    )>>, parentTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
      & { parentTopic: (
        { __typename?: 'Domain' }
        & DomainDataFragment
      ) | { __typename?: 'Concept' } | { __typename?: 'LearningGoal' } }
    )>> }
    & DomainDataFragment
  ) }
);



/**
 * __useGetDomainByKeyManageDomainPageQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyManageDomainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyManageDomainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyManageDomainPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyManageDomainPageQuery(baseOptions: Apollo.QueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
        return Apollo.useQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
      }
export function useGetDomainByKeyManageDomainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
        }
export type GetDomainByKeyManageDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageQuery>;
export type GetDomainByKeyManageDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageLazyQuery>;
export type GetDomainByKeyManageDomainPageQueryResult = Apollo.QueryResult<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>;