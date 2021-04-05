import * as Types from '../types';

import { DomainDataFragment, DomainLinkDataFragment } from './domains.fragments.generated';
import * as Operations from './domains.operations';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & DomainDataFragment
  ) }
);

export type SearchDomainsQueryVariables = Types.Exact<{
  options: Types.SearchDomainsOptions;
}>;


export type SearchDomainsQuery = (
  { __typename?: 'Query' }
  & { searchDomains: (
    { __typename?: 'SearchDomainsResult' }
    & { items: Array<(
      { __typename?: 'Domain' }
      & DomainDataFragment
    )> }
  ) }
);

export type CreateDomainMutationVariables = Types.Exact<{
  payload: Types.CreateDomainPayload;
}>;


export type CreateDomainMutation = (
  { __typename?: 'Mutation' }
  & { createDomain: (
    { __typename?: 'Domain' }
    & DomainDataFragment
  ) }
);

export type UpdateDomainMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  payload: Types.UpdateDomainPayload;
}>;


export type UpdateDomainMutation = (
  { __typename?: 'Mutation' }
  & { updateDomain: (
    { __typename?: 'Domain' }
    & DomainDataFragment
  ) }
);

export type DeleteDomainMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteDomainMutation = (
  { __typename?: 'Mutation' }
  & { deleteDomain: (
    { __typename?: 'DeleteDomainResponse' }
    & Pick<Types.DeleteDomainResponse, '_id' | 'success'>
  ) }
);



/**
 * __useGetDomainByKeyQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyQuery(baseOptions: Apollo.QueryHookOptions<GetDomainByKeyQuery, GetDomainByKeyQueryVariables>) {
        return Apollo.useQuery<GetDomainByKeyQuery, GetDomainByKeyQueryVariables>(Operations.getDomainByKey, baseOptions);
      }
export function useGetDomainByKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainByKeyQuery, GetDomainByKeyQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainByKeyQuery, GetDomainByKeyQueryVariables>(Operations.getDomainByKey, baseOptions);
        }
export type GetDomainByKeyQueryHookResult = ReturnType<typeof useGetDomainByKeyQuery>;
export type GetDomainByKeyLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyLazyQuery>;
export type GetDomainByKeyQueryResult = Apollo.QueryResult<GetDomainByKeyQuery, GetDomainByKeyQueryVariables>;

/**
 * __useSearchDomainsQuery__
 *
 * To run a query within a React component, call `useSearchDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDomainsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchDomainsQuery(baseOptions: Apollo.QueryHookOptions<SearchDomainsQuery, SearchDomainsQueryVariables>) {
        return Apollo.useQuery<SearchDomainsQuery, SearchDomainsQueryVariables>(Operations.searchDomains, baseOptions);
      }
export function useSearchDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDomainsQuery, SearchDomainsQueryVariables>) {
          return Apollo.useLazyQuery<SearchDomainsQuery, SearchDomainsQueryVariables>(Operations.searchDomains, baseOptions);
        }
export type SearchDomainsQueryHookResult = ReturnType<typeof useSearchDomainsQuery>;
export type SearchDomainsLazyQueryHookResult = ReturnType<typeof useSearchDomainsLazyQuery>;
export type SearchDomainsQueryResult = Apollo.QueryResult<SearchDomainsQuery, SearchDomainsQueryVariables>;
export type CreateDomainMutationFn = Apollo.MutationFunction<CreateDomainMutation, CreateDomainMutationVariables>;

/**
 * __useCreateDomainMutation__
 *
 * To run a mutation, you first call `useCreateDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDomainMutation, { data, loading, error }] = useCreateDomainMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateDomainMutation(baseOptions?: Apollo.MutationHookOptions<CreateDomainMutation, CreateDomainMutationVariables>) {
        return Apollo.useMutation<CreateDomainMutation, CreateDomainMutationVariables>(Operations.createDomain, baseOptions);
      }
export type CreateDomainMutationHookResult = ReturnType<typeof useCreateDomainMutation>;
export type CreateDomainMutationResult = Apollo.MutationResult<CreateDomainMutation>;
export type CreateDomainMutationOptions = Apollo.BaseMutationOptions<CreateDomainMutation, CreateDomainMutationVariables>;
export type UpdateDomainMutationFn = Apollo.MutationFunction<UpdateDomainMutation, UpdateDomainMutationVariables>;

/**
 * __useUpdateDomainMutation__
 *
 * To run a mutation, you first call `useUpdateDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDomainMutation, { data, loading, error }] = useUpdateDomainMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateDomainMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDomainMutation, UpdateDomainMutationVariables>) {
        return Apollo.useMutation<UpdateDomainMutation, UpdateDomainMutationVariables>(Operations.updateDomain, baseOptions);
      }
export type UpdateDomainMutationHookResult = ReturnType<typeof useUpdateDomainMutation>;
export type UpdateDomainMutationResult = Apollo.MutationResult<UpdateDomainMutation>;
export type UpdateDomainMutationOptions = Apollo.BaseMutationOptions<UpdateDomainMutation, UpdateDomainMutationVariables>;
export type DeleteDomainMutationFn = Apollo.MutationFunction<DeleteDomainMutation, DeleteDomainMutationVariables>;

/**
 * __useDeleteDomainMutation__
 *
 * To run a mutation, you first call `useDeleteDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDomainMutation, { data, loading, error }] = useDeleteDomainMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDomainMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDomainMutation, DeleteDomainMutationVariables>) {
        return Apollo.useMutation<DeleteDomainMutation, DeleteDomainMutationVariables>(Operations.deleteDomain, baseOptions);
      }
export type DeleteDomainMutationHookResult = ReturnType<typeof useDeleteDomainMutation>;
export type DeleteDomainMutationResult = Apollo.MutationResult<DeleteDomainMutation>;
export type DeleteDomainMutationOptions = Apollo.BaseMutationOptions<DeleteDomainMutation, DeleteDomainMutationVariables>;