import * as Types from '../types';

import { ConceptDataFragment } from './concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../resources/resources.fragments.generated';
import * as Operations from './concepts.operations';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type AddConceptToDomainMutationVariables = {
  domainId: Types.Scalars['String'];
  payload: Types.AddConceptToDomainPayload;
};


export type AddConceptToDomainMutation = (
  { __typename?: 'Mutation' }
  & { addConceptToDomain: (
    { __typename?: 'Concept' }
    & ConceptDataFragment
  ) }
);

export type UpdateConceptMutationVariables = {
  _id: Types.Scalars['String'];
  payload: Types.UpdateConceptPayload;
};


export type UpdateConceptMutation = (
  { __typename?: 'Mutation' }
  & { updateConcept: (
    { __typename?: 'Concept' }
    & ConceptDataFragment
  ) }
);

export type DeleteConceptMutationVariables = {
  _id: Types.Scalars['String'];
};


export type DeleteConceptMutation = (
  { __typename?: 'Mutation' }
  & { deleteConcept: (
    { __typename?: 'DeleteConceptResult' }
    & Pick<Types.DeleteConceptResult, '_id' | 'success'>
  ) }
);

export type GetConceptQueryVariables = {
  _id: Types.Scalars['String'];
};


export type GetConceptQuery = (
  { __typename?: 'Query' }
  & { getConcept: (
    { __typename?: 'Concept' }
    & { coveredByResources?: Types.Maybe<(
      { __typename?: 'ConceptCoveredByResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )> }
    & ConceptDataFragment
  ) }
);

export type GetConceptByKeyQueryVariables = {
  key: Types.Scalars['String'];
};


export type GetConceptByKeyQuery = (
  { __typename?: 'Query' }
  & { getConceptByKey: (
    { __typename?: 'Concept' }
    & { coveredByResources?: Types.Maybe<(
      { __typename?: 'ConceptCoveredByResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )> }
    & ConceptDataFragment
  ) }
);


export type AddConceptToDomainMutationFn = ApolloReactCommon.MutationFunction<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>;

/**
 * __useAddConceptToDomainMutation__
 *
 * To run a mutation, you first call `useAddConceptToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConceptToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConceptToDomainMutation, { data, loading, error }] = useAddConceptToDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddConceptToDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>) {
        return ApolloReactHooks.useMutation<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>(Operations.addConceptToDomain, baseOptions);
      }
export type AddConceptToDomainMutationHookResult = ReturnType<typeof useAddConceptToDomainMutation>;
export type AddConceptToDomainMutationResult = ApolloReactCommon.MutationResult<AddConceptToDomainMutation>;
export type AddConceptToDomainMutationOptions = ApolloReactCommon.BaseMutationOptions<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>;
export type UpdateConceptMutationFn = ApolloReactCommon.MutationFunction<UpdateConceptMutation, UpdateConceptMutationVariables>;

/**
 * __useUpdateConceptMutation__
 *
 * To run a mutation, you first call `useUpdateConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConceptMutation, { data, loading, error }] = useUpdateConceptMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateConceptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateConceptMutation, UpdateConceptMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateConceptMutation, UpdateConceptMutationVariables>(Operations.updateConcept, baseOptions);
      }
export type UpdateConceptMutationHookResult = ReturnType<typeof useUpdateConceptMutation>;
export type UpdateConceptMutationResult = ApolloReactCommon.MutationResult<UpdateConceptMutation>;
export type UpdateConceptMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateConceptMutation, UpdateConceptMutationVariables>;
export type DeleteConceptMutationFn = ApolloReactCommon.MutationFunction<DeleteConceptMutation, DeleteConceptMutationVariables>;

/**
 * __useDeleteConceptMutation__
 *
 * To run a mutation, you first call `useDeleteConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConceptMutation, { data, loading, error }] = useDeleteConceptMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteConceptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteConceptMutation, DeleteConceptMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteConceptMutation, DeleteConceptMutationVariables>(Operations.deleteConcept, baseOptions);
      }
export type DeleteConceptMutationHookResult = ReturnType<typeof useDeleteConceptMutation>;
export type DeleteConceptMutationResult = ApolloReactCommon.MutationResult<DeleteConceptMutation>;
export type DeleteConceptMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteConceptMutation, DeleteConceptMutationVariables>;

/**
 * __useGetConceptQuery__
 *
 * To run a query within a React component, call `useGetConceptQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConceptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConceptQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetConceptQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetConceptQuery, GetConceptQueryVariables>) {
        return ApolloReactHooks.useQuery<GetConceptQuery, GetConceptQueryVariables>(Operations.getConcept, baseOptions);
      }
export function useGetConceptLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConceptQuery, GetConceptQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetConceptQuery, GetConceptQueryVariables>(Operations.getConcept, baseOptions);
        }
export type GetConceptQueryHookResult = ReturnType<typeof useGetConceptQuery>;
export type GetConceptLazyQueryHookResult = ReturnType<typeof useGetConceptLazyQuery>;
export type GetConceptQueryResult = ApolloReactCommon.QueryResult<GetConceptQuery, GetConceptQueryVariables>;

/**
 * __useGetConceptByKeyQuery__
 *
 * To run a query within a React component, call `useGetConceptByKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConceptByKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConceptByKeyQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetConceptByKeyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetConceptByKeyQuery, GetConceptByKeyQueryVariables>) {
        return ApolloReactHooks.useQuery<GetConceptByKeyQuery, GetConceptByKeyQueryVariables>(Operations.getConceptByKey, baseOptions);
      }
export function useGetConceptByKeyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConceptByKeyQuery, GetConceptByKeyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetConceptByKeyQuery, GetConceptByKeyQueryVariables>(Operations.getConceptByKey, baseOptions);
        }
export type GetConceptByKeyQueryHookResult = ReturnType<typeof useGetConceptByKeyQuery>;
export type GetConceptByKeyLazyQueryHookResult = ReturnType<typeof useGetConceptByKeyLazyQuery>;
export type GetConceptByKeyQueryResult = ApolloReactCommon.QueryResult<GetConceptByKeyQuery, GetConceptByKeyQueryVariables>;