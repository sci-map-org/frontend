import * as Types from '../../../graphql/types';

import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { MapVisualisationTopicData_Domain_Fragment, MapVisualisationTopicData_Concept_Fragment, MapVisualisationTopicData_LearningGoal_Fragment } from '../../../components/topics/SubTopicsMapVisualisation.generated';
import { SubTopicsMenuDataFragment } from '../../../components/topics/SubTopicsMenu.generated';
import { ResourcePreviewDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { DomainDataFragment, DomainLinkDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import * as Operations from './ConceptPage';
import * as Apollo from '@apollo/client';
export type GetConceptConceptPageQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
  conceptKey: Types.Scalars['String'];
}>;


export type GetConceptConceptPageQuery = (
  { __typename?: 'Query' }
  & { getDomainConceptByKey: (
    { __typename?: 'Concept' }
    & { referencingConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptReferencesConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & ConceptDataFragment
      ) }
    )>>, subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & SubTopicsMenuDataFragment
    )>>, parentTopic?: Types.Maybe<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & { parentTopic: (
        { __typename?: 'Domain' }
        & MapVisualisationTopicData_Domain_Fragment
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'key' | 'name'>
        & { parentTopic?: Types.Maybe<(
          { __typename?: 'TopicIsSubTopicOfTopic' }
          & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
          & { parentTopic: { __typename?: 'Domain' } | (
            { __typename?: 'Concept' }
            & Pick<Types.Concept, '_id' | 'key' | 'name'>
          ) | { __typename?: 'LearningGoal' } }
        )> }
        & MapVisualisationTopicData_Concept_Fragment
      ) | (
        { __typename?: 'LearningGoal' }
        & MapVisualisationTopicData_LearningGoal_Fragment
      ) }
    )>, coveredByResources?: Types.Maybe<(
      { __typename?: 'ConceptCoveredByResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )>, domain?: Types.Maybe<(
      { __typename?: 'Domain' }
      & { concepts?: Types.Maybe<(
        { __typename?: 'DomainConceptsResults' }
        & { items: Array<(
          { __typename?: 'DomainConceptsItem' }
          & { concept: (
            { __typename?: 'Concept' }
            & ConceptDataFragment
          ) }
        )> }
      )> }
      & DomainDataFragment
    )> }
    & ConceptDataFragment
    & MapVisualisationTopicData_Concept_Fragment
  ) }
);

export type AddConceptReferencesConceptMutationVariables = Types.Exact<{
  conceptId: Types.Scalars['String'];
  referencedConceptId: Types.Scalars['String'];
}>;


export type AddConceptReferencesConceptMutation = (
  { __typename?: 'Mutation' }
  & { addConceptReferencesConcept: (
    { __typename?: 'UpdateConceptReferencesConceptResult' }
    & { concept: (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id'>
      & { referencingConcepts?: Types.Maybe<Array<(
        { __typename?: 'ConceptReferencesConceptItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) }
      )>> }
    ), referencedConcept: (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id'>
      & { referencedByConcepts?: Types.Maybe<Array<(
        { __typename?: 'ConceptReferencesConceptItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) }
      )>> }
    ) }
  ) }
);

export type RemoveConceptReferencesConceptMutationVariables = Types.Exact<{
  conceptId: Types.Scalars['String'];
  referencedConceptId: Types.Scalars['String'];
}>;


export type RemoveConceptReferencesConceptMutation = (
  { __typename?: 'Mutation' }
  & { removeConceptReferencesConcept: (
    { __typename?: 'UpdateConceptReferencesConceptResult' }
    & { concept: (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id'>
      & { referencingConcepts?: Types.Maybe<Array<(
        { __typename?: 'ConceptReferencesConceptItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) }
      )>> }
    ), referencedConcept: (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id'>
      & { referencedByConcepts?: Types.Maybe<Array<(
        { __typename?: 'ConceptReferencesConceptItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) }
      )>> }
    ) }
  ) }
);



/**
 * __useGetConceptConceptPageQuery__
 *
 * To run a query within a React component, call `useGetConceptConceptPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConceptConceptPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConceptConceptPageQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      conceptKey: // value for 'conceptKey'
 *   },
 * });
 */
export function useGetConceptConceptPageQuery(baseOptions: Apollo.QueryHookOptions<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>) {
        return Apollo.useQuery<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>(Operations.getConceptConceptPage, baseOptions);
      }
export function useGetConceptConceptPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>) {
          return Apollo.useLazyQuery<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>(Operations.getConceptConceptPage, baseOptions);
        }
export type GetConceptConceptPageQueryHookResult = ReturnType<typeof useGetConceptConceptPageQuery>;
export type GetConceptConceptPageLazyQueryHookResult = ReturnType<typeof useGetConceptConceptPageLazyQuery>;
export type GetConceptConceptPageQueryResult = Apollo.QueryResult<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>;
export type AddConceptReferencesConceptMutationFn = Apollo.MutationFunction<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>;

/**
 * __useAddConceptReferencesConceptMutation__
 *
 * To run a mutation, you first call `useAddConceptReferencesConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConceptReferencesConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConceptReferencesConceptMutation, { data, loading, error }] = useAddConceptReferencesConceptMutation({
 *   variables: {
 *      conceptId: // value for 'conceptId'
 *      referencedConceptId: // value for 'referencedConceptId'
 *   },
 * });
 */
export function useAddConceptReferencesConceptMutation(baseOptions?: Apollo.MutationHookOptions<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>) {
        return Apollo.useMutation<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>(Operations.addConceptReferencesConcept, baseOptions);
      }
export type AddConceptReferencesConceptMutationHookResult = ReturnType<typeof useAddConceptReferencesConceptMutation>;
export type AddConceptReferencesConceptMutationResult = Apollo.MutationResult<AddConceptReferencesConceptMutation>;
export type AddConceptReferencesConceptMutationOptions = Apollo.BaseMutationOptions<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>;
export type RemoveConceptReferencesConceptMutationFn = Apollo.MutationFunction<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>;

/**
 * __useRemoveConceptReferencesConceptMutation__
 *
 * To run a mutation, you first call `useRemoveConceptReferencesConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConceptReferencesConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConceptReferencesConceptMutation, { data, loading, error }] = useRemoveConceptReferencesConceptMutation({
 *   variables: {
 *      conceptId: // value for 'conceptId'
 *      referencedConceptId: // value for 'referencedConceptId'
 *   },
 * });
 */
export function useRemoveConceptReferencesConceptMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>) {
        return Apollo.useMutation<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>(Operations.removeConceptReferencesConcept, baseOptions);
      }
export type RemoveConceptReferencesConceptMutationHookResult = ReturnType<typeof useRemoveConceptReferencesConceptMutation>;
export type RemoveConceptReferencesConceptMutationResult = Apollo.MutationResult<RemoveConceptReferencesConceptMutation>;
export type RemoveConceptReferencesConceptMutationOptions = Apollo.BaseMutationOptions<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>;