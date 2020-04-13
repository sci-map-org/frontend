import * as Types from '../../graphql/types';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import * as Operations from './ConceptList';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateConceptBelongsToDomainIndexMutationVariables = {
  conceptId: Types.Scalars['String'];
  domainId: Types.Scalars['String'];
  index: Types.Scalars['Float'];
};


export type UpdateConceptBelongsToDomainIndexMutation = (
  { __typename?: 'Mutation' }
  & { updateConceptBelongsToDomain: (
    { __typename?: 'ConceptBelongsToDomain' }
    & Pick<Types.ConceptBelongsToDomain, 'index'>
  ) }
);

export type ListDomainConceptsQueryVariables = {
  domainKey: Types.Scalars['String'];
  options: Types.DomainConceptsOptions;
};


export type ListDomainConceptsQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'name'>
    & { concepts?: Types.Maybe<(
      { __typename?: 'DomainConceptsResults' }
      & { items: Array<(
        { __typename?: 'DomainConceptsItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & ConceptDataFragment
        ), relationship: (
          { __typename?: 'ConceptBelongsToDomain' }
          & Pick<Types.ConceptBelongsToDomain, 'index'>
        ) }
      )> }
    )> }
  ) }
);


export type UpdateConceptBelongsToDomainIndexMutationFn = ApolloReactCommon.MutationFunction<UpdateConceptBelongsToDomainIndexMutation, UpdateConceptBelongsToDomainIndexMutationVariables>;

/**
 * __useUpdateConceptBelongsToDomainIndexMutation__
 *
 * To run a mutation, you first call `useUpdateConceptBelongsToDomainIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConceptBelongsToDomainIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConceptBelongsToDomainIndexMutation, { data, loading, error }] = useUpdateConceptBelongsToDomainIndexMutation({
 *   variables: {
 *      conceptId: // value for 'conceptId'
 *      domainId: // value for 'domainId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useUpdateConceptBelongsToDomainIndexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateConceptBelongsToDomainIndexMutation, UpdateConceptBelongsToDomainIndexMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateConceptBelongsToDomainIndexMutation, UpdateConceptBelongsToDomainIndexMutationVariables>(Operations.updateConceptBelongsToDomainIndex, baseOptions);
      }
export type UpdateConceptBelongsToDomainIndexMutationHookResult = ReturnType<typeof useUpdateConceptBelongsToDomainIndexMutation>;
export type UpdateConceptBelongsToDomainIndexMutationResult = ApolloReactCommon.MutationResult<UpdateConceptBelongsToDomainIndexMutation>;
export type UpdateConceptBelongsToDomainIndexMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateConceptBelongsToDomainIndexMutation, UpdateConceptBelongsToDomainIndexMutationVariables>;

/**
 * __useListDomainConceptsQuery__
 *
 * To run a query within a React component, call `useListDomainConceptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDomainConceptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDomainConceptsQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useListDomainConceptsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListDomainConceptsQuery, ListDomainConceptsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListDomainConceptsQuery, ListDomainConceptsQueryVariables>(Operations.listDomainConcepts, baseOptions);
      }
export function useListDomainConceptsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListDomainConceptsQuery, ListDomainConceptsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListDomainConceptsQuery, ListDomainConceptsQueryVariables>(Operations.listDomainConcepts, baseOptions);
        }
export type ListDomainConceptsQueryHookResult = ReturnType<typeof useListDomainConceptsQuery>;
export type ListDomainConceptsLazyQueryHookResult = ReturnType<typeof useListDomainConceptsLazyQuery>;
export type ListDomainConceptsQueryResult = ApolloReactCommon.QueryResult<ListDomainConceptsQuery, ListDomainConceptsQueryVariables>;