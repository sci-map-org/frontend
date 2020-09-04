import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import * as Operations from './ManageDomainPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetDomainByKeyManageDomainPageQueryVariables = Exact<{
  key: Types.Scalars['String'];
}>;


export type GetDomainByKeyManageDomainPageQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & { subDomains?: Types.Maybe<Array<(
      { __typename?: 'DomainBelongsToDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & DomainDataFragment
      ) }
    )>> }
    & DomainDataFragment
  ) }
);

export type AddDomainBelongsToDomainMutationVariables = Exact<{
  parentDomainId: Types.Scalars['String'];
  subDomainId: Types.Scalars['String'];
}>;


export type AddDomainBelongsToDomainMutation = (
  { __typename?: 'Mutation' }
  & { addDomainBelongsToDomain: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & { subDomains?: Types.Maybe<Array<(
      { __typename?: 'DomainBelongsToDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
      ) }
    )>> }
  ) }
);

export type RemoveDomainBelongsToDomainMutationVariables = Exact<{
  parentDomainId: Types.Scalars['String'];
  subDomainId: Types.Scalars['String'];
}>;


export type RemoveDomainBelongsToDomainMutation = (
  { __typename?: 'Mutation' }
  & { removeDomainBelongsToDomain: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & { subDomains?: Types.Maybe<Array<(
      { __typename?: 'DomainBelongsToDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
      ) }
    )>> }
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
export function useGetDomainByKeyManageDomainPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
      }
export function useGetDomainByKeyManageDomainPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
        }
export type GetDomainByKeyManageDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageQuery>;
export type GetDomainByKeyManageDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageLazyQuery>;
export type GetDomainByKeyManageDomainPageQueryResult = ApolloReactCommon.QueryResult<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>;
export type AddDomainBelongsToDomainMutationFn = ApolloReactCommon.MutationFunction<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>;

/**
 * __useAddDomainBelongsToDomainMutation__
 *
 * To run a mutation, you first call `useAddDomainBelongsToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDomainBelongsToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDomainBelongsToDomainMutation, { data, loading, error }] = useAddDomainBelongsToDomainMutation({
 *   variables: {
 *      parentDomainId: // value for 'parentDomainId'
 *      subDomainId: // value for 'subDomainId'
 *   },
 * });
 */
export function useAddDomainBelongsToDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>) {
        return ApolloReactHooks.useMutation<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>(Operations.addDomainBelongsToDomain, baseOptions);
      }
export type AddDomainBelongsToDomainMutationHookResult = ReturnType<typeof useAddDomainBelongsToDomainMutation>;
export type AddDomainBelongsToDomainMutationResult = ApolloReactCommon.MutationResult<AddDomainBelongsToDomainMutation>;
export type AddDomainBelongsToDomainMutationOptions = ApolloReactCommon.BaseMutationOptions<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>;
export type RemoveDomainBelongsToDomainMutationFn = ApolloReactCommon.MutationFunction<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>;

/**
 * __useRemoveDomainBelongsToDomainMutation__
 *
 * To run a mutation, you first call `useRemoveDomainBelongsToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDomainBelongsToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDomainBelongsToDomainMutation, { data, loading, error }] = useRemoveDomainBelongsToDomainMutation({
 *   variables: {
 *      parentDomainId: // value for 'parentDomainId'
 *      subDomainId: // value for 'subDomainId'
 *   },
 * });
 */
export function useRemoveDomainBelongsToDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>(Operations.removeDomainBelongsToDomain, baseOptions);
      }
export type RemoveDomainBelongsToDomainMutationHookResult = ReturnType<typeof useRemoveDomainBelongsToDomainMutation>;
export type RemoveDomainBelongsToDomainMutationResult = ApolloReactCommon.MutationResult<RemoveDomainBelongsToDomainMutation>;
export type RemoveDomainBelongsToDomainMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>;