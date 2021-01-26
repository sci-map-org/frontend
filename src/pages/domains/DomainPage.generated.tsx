import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import * as Operations from './DomainPage';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyDomainPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & { concepts?: Types.Maybe<(
      { __typename?: 'DomainConceptsResults' }
      & { items: Array<(
        { __typename?: 'DomainConceptsItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & { referencedByConcepts?: Types.Maybe<Array<(
            { __typename?: 'ConceptReferencesConceptItem' }
            & { concept: (
              { __typename?: 'Concept' }
              & Pick<Types.Concept, '_id'>
            ) }
          )>>, subConcepts?: Types.Maybe<Array<(
            { __typename?: 'ConceptBelongsToConceptItem' }
            & { concept: (
              { __typename?: 'Concept' }
              & Pick<Types.Concept, '_id'>
            ) }
          )>> }
          & ConceptDataFragment
        ), relationship: (
          { __typename?: 'ConceptBelongsToDomain' }
          & Pick<Types.ConceptBelongsToDomain, 'index'>
        ) }
      )> }
    )>, subDomains?: Types.Maybe<Array<(
      { __typename?: 'DomainBelongsToDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & DomainDataFragment
      ) }
    )>>, learningGoals?: Types.Maybe<Array<(
      { __typename?: 'LearningGoalBelongsToDomain' }
      & Pick<Types.LearningGoalBelongsToDomain, 'contextualKey' | 'contextualName'>
      & { learningGoal: (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, '_id'>
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