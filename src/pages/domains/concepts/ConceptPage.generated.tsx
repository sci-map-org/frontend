import * as Types from '../../../graphql/types';

import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import * as Operations from './ConceptPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetConceptConceptPageQueryVariables = Exact<{
  key: Types.Scalars['String'];
}>;


export type GetConceptConceptPageQuery = (
  { __typename?: 'Query' }
  & { getConceptByKey: (
    { __typename?: 'Concept' }
    & { referencingConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptReferencesConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & ConceptDataFragment
      ) }
    )>>, subConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptBelongsToConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & ConceptDataFragment
      ) }
    )>>, coveredByResources?: Types.Maybe<(
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
  ) }
);

export type AddConceptReferencesConceptMutationVariables = Exact<{
  conceptId: Types.Scalars['String'];
  referencedConceptId: Types.Scalars['String'];
}>;


export type AddConceptReferencesConceptMutation = (
  { __typename?: 'Mutation' }
  & { addConceptReferencesConcept: (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id'>
    & { referencingConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptReferencesConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      ) }
    )>> }
  ) }
);

export type RemoveConceptReferencesConceptMutationVariables = Exact<{
  conceptId: Types.Scalars['String'];
  referencedConceptId: Types.Scalars['String'];
}>;


export type RemoveConceptReferencesConceptMutation = (
  { __typename?: 'Mutation' }
  & { removeConceptReferencesConcept: (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id'>
    & { referencingConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptReferencesConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      ) }
    )>> }
  ) }
);

export type AddConceptBelongsToConceptMutationVariables = Exact<{
  parentConceptId: Types.Scalars['String'];
  subConceptId: Types.Scalars['String'];
}>;


export type AddConceptBelongsToConceptMutation = (
  { __typename?: 'Mutation' }
  & { addConceptBelongsToConcept: (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id'>
    & { subConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptBelongsToConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      ) }
    )>> }
  ) }
);

export type RemoveConceptBelongsToConceptMutationVariables = Exact<{
  parentConceptId: Types.Scalars['String'];
  subConceptId: Types.Scalars['String'];
}>;


export type RemoveConceptBelongsToConceptMutation = (
  { __typename?: 'Mutation' }
  & { removeConceptBelongsToConcept: (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id'>
    & { subConcepts?: Types.Maybe<Array<(
      { __typename?: 'ConceptBelongsToConceptItem' }
      & { concept: (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
      ) }
    )>> }
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
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetConceptConceptPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>(Operations.getConceptConceptPage, baseOptions);
      }
export function useGetConceptConceptPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>(Operations.getConceptConceptPage, baseOptions);
        }
export type GetConceptConceptPageQueryHookResult = ReturnType<typeof useGetConceptConceptPageQuery>;
export type GetConceptConceptPageLazyQueryHookResult = ReturnType<typeof useGetConceptConceptPageLazyQuery>;
export type GetConceptConceptPageQueryResult = ApolloReactCommon.QueryResult<GetConceptConceptPageQuery, GetConceptConceptPageQueryVariables>;
export type AddConceptReferencesConceptMutationFn = ApolloReactCommon.MutationFunction<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>;

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
export function useAddConceptReferencesConceptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>) {
        return ApolloReactHooks.useMutation<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>(Operations.addConceptReferencesConcept, baseOptions);
      }
export type AddConceptReferencesConceptMutationHookResult = ReturnType<typeof useAddConceptReferencesConceptMutation>;
export type AddConceptReferencesConceptMutationResult = ApolloReactCommon.MutationResult<AddConceptReferencesConceptMutation>;
export type AddConceptReferencesConceptMutationOptions = ApolloReactCommon.BaseMutationOptions<AddConceptReferencesConceptMutation, AddConceptReferencesConceptMutationVariables>;
export type RemoveConceptReferencesConceptMutationFn = ApolloReactCommon.MutationFunction<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>;

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
export function useRemoveConceptReferencesConceptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>(Operations.removeConceptReferencesConcept, baseOptions);
      }
export type RemoveConceptReferencesConceptMutationHookResult = ReturnType<typeof useRemoveConceptReferencesConceptMutation>;
export type RemoveConceptReferencesConceptMutationResult = ApolloReactCommon.MutationResult<RemoveConceptReferencesConceptMutation>;
export type RemoveConceptReferencesConceptMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveConceptReferencesConceptMutation, RemoveConceptReferencesConceptMutationVariables>;
export type AddConceptBelongsToConceptMutationFn = ApolloReactCommon.MutationFunction<AddConceptBelongsToConceptMutation, AddConceptBelongsToConceptMutationVariables>;

/**
 * __useAddConceptBelongsToConceptMutation__
 *
 * To run a mutation, you first call `useAddConceptBelongsToConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConceptBelongsToConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConceptBelongsToConceptMutation, { data, loading, error }] = useAddConceptBelongsToConceptMutation({
 *   variables: {
 *      parentConceptId: // value for 'parentConceptId'
 *      subConceptId: // value for 'subConceptId'
 *   },
 * });
 */
export function useAddConceptBelongsToConceptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddConceptBelongsToConceptMutation, AddConceptBelongsToConceptMutationVariables>) {
        return ApolloReactHooks.useMutation<AddConceptBelongsToConceptMutation, AddConceptBelongsToConceptMutationVariables>(Operations.addConceptBelongsToConcept, baseOptions);
      }
export type AddConceptBelongsToConceptMutationHookResult = ReturnType<typeof useAddConceptBelongsToConceptMutation>;
export type AddConceptBelongsToConceptMutationResult = ApolloReactCommon.MutationResult<AddConceptBelongsToConceptMutation>;
export type AddConceptBelongsToConceptMutationOptions = ApolloReactCommon.BaseMutationOptions<AddConceptBelongsToConceptMutation, AddConceptBelongsToConceptMutationVariables>;
export type RemoveConceptBelongsToConceptMutationFn = ApolloReactCommon.MutationFunction<RemoveConceptBelongsToConceptMutation, RemoveConceptBelongsToConceptMutationVariables>;

/**
 * __useRemoveConceptBelongsToConceptMutation__
 *
 * To run a mutation, you first call `useRemoveConceptBelongsToConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConceptBelongsToConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConceptBelongsToConceptMutation, { data, loading, error }] = useRemoveConceptBelongsToConceptMutation({
 *   variables: {
 *      parentConceptId: // value for 'parentConceptId'
 *      subConceptId: // value for 'subConceptId'
 *   },
 * });
 */
export function useRemoveConceptBelongsToConceptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveConceptBelongsToConceptMutation, RemoveConceptBelongsToConceptMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveConceptBelongsToConceptMutation, RemoveConceptBelongsToConceptMutationVariables>(Operations.removeConceptBelongsToConcept, baseOptions);
      }
export type RemoveConceptBelongsToConceptMutationHookResult = ReturnType<typeof useRemoveConceptBelongsToConceptMutation>;
export type RemoveConceptBelongsToConceptMutationResult = ApolloReactCommon.MutationResult<RemoveConceptBelongsToConceptMutation>;
export type RemoveConceptBelongsToConceptMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveConceptBelongsToConceptMutation, RemoveConceptBelongsToConceptMutationVariables>;