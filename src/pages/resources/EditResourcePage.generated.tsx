import * as Types from '../../graphql/types';

import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import * as Operations from './EditResourcePage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type UpdateResourceResourcePageMutationVariables = Exact<{
  id: Types.Scalars['String'];
  payload: Types.UpdateResourcePayload;
}>;


export type UpdateResourceResourcePageMutation = (
  { __typename?: 'Mutation' }
  & { updateResource: (
    { __typename?: 'Resource' }
    & ResourceDataFragment
  ) }
);

export type GetResourceEditResourcePageQueryVariables = Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourceEditResourcePageQuery = (
  { __typename?: 'Query' }
  & { getResourceById: (
    { __typename?: 'Resource' }
    & { coveredConcepts?: Types.Maybe<(
      { __typename?: 'ResourceCoveredConceptsResults' }
      & { items: Array<(
        { __typename?: 'Concept' }
        & { domain?: Types.Maybe<(
          { __typename?: 'Domain' }
          & Pick<Types.Domain, '_id' | 'key' | 'name'>
        )> }
        & ConceptDataFragment
      )> }
    )>, domains?: Types.Maybe<(
      { __typename?: 'ResourceDomainsResults' }
      & { items: Array<(
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key' | 'name'>
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
      )> }
    )> }
    & ResourceDataFragment
  ) }
);


export type UpdateResourceResourcePageMutationFn = ApolloReactCommon.MutationFunction<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>;

/**
 * __useUpdateResourceResourcePageMutation__
 *
 * To run a mutation, you first call `useUpdateResourceResourcePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResourceResourcePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResourceResourcePageMutation, { data, loading, error }] = useUpdateResourceResourcePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateResourceResourcePageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>(Operations.updateResourceResourcePage, baseOptions);
      }
export type UpdateResourceResourcePageMutationHookResult = ReturnType<typeof useUpdateResourceResourcePageMutation>;
export type UpdateResourceResourcePageMutationResult = ApolloReactCommon.MutationResult<UpdateResourceResourcePageMutation>;
export type UpdateResourceResourcePageMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>;

/**
 * __useGetResourceEditResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceEditResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceEditResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceEditResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceEditResourcePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, baseOptions);
      }
export function useGetResourceEditResourcePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, baseOptions);
        }
export type GetResourceEditResourcePageQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageQuery>;
export type GetResourceEditResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageLazyQuery>;
export type GetResourceEditResourcePageQueryResult = ApolloReactCommon.QueryResult<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>;