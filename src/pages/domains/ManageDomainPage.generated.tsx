import * as Types from '../../graphql/types';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import * as Operations from './ManageDomainPage';
import * as Apollo from '@apollo/client';
export type GetDomainByKeyManageDomainPageQueryVariables = Types.Exact<{
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

export type AddDomainBelongsToDomainMutationVariables = Types.Exact<{
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

export type RemoveDomainBelongsToDomainMutationVariables = Types.Exact<{
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
export function useGetDomainByKeyManageDomainPageQuery(baseOptions: Apollo.QueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
        return Apollo.useQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
      }
export function useGetDomainByKeyManageDomainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>(Operations.getDomainByKeyManageDomainPage, baseOptions);
        }
export type GetDomainByKeyManageDomainPageQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageQuery>;
export type GetDomainByKeyManageDomainPageLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyManageDomainPageLazyQuery>;
export type GetDomainByKeyManageDomainPageQueryResult = Apollo.QueryResult<GetDomainByKeyManageDomainPageQuery, GetDomainByKeyManageDomainPageQueryVariables>;
export type AddDomainBelongsToDomainMutationFn = Apollo.MutationFunction<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>;

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
export function useAddDomainBelongsToDomainMutation(baseOptions?: Apollo.MutationHookOptions<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>) {
        return Apollo.useMutation<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>(Operations.addDomainBelongsToDomain, baseOptions);
      }
export type AddDomainBelongsToDomainMutationHookResult = ReturnType<typeof useAddDomainBelongsToDomainMutation>;
export type AddDomainBelongsToDomainMutationResult = Apollo.MutationResult<AddDomainBelongsToDomainMutation>;
export type AddDomainBelongsToDomainMutationOptions = Apollo.BaseMutationOptions<AddDomainBelongsToDomainMutation, AddDomainBelongsToDomainMutationVariables>;
export type RemoveDomainBelongsToDomainMutationFn = Apollo.MutationFunction<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>;

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
export function useRemoveDomainBelongsToDomainMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>) {
        return Apollo.useMutation<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>(Operations.removeDomainBelongsToDomain, baseOptions);
      }
export type RemoveDomainBelongsToDomainMutationHookResult = ReturnType<typeof useRemoveDomainBelongsToDomainMutation>;
export type RemoveDomainBelongsToDomainMutationResult = Apollo.MutationResult<RemoveDomainBelongsToDomainMutation>;
export type RemoveDomainBelongsToDomainMutationOptions = Apollo.BaseMutationOptions<RemoveDomainBelongsToDomainMutation, RemoveDomainBelongsToDomainMutationVariables>;