import * as Types from '../../../graphql/types';

import { DomainWithConceptsDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import * as Operations from './AddResourceToDomainPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GetDomainByKeyWithConceptsQueryVariables = {
  key: Types.Scalars['String'];
};


export type GetDomainByKeyWithConceptsQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & DomainWithConceptsDataFragment
  ) }
);

export type AddResourceToDomainMutationVariables = {
  domainId: Types.Scalars['String'];
  payload: Types.CreateResourcePayload;
};


export type AddResourceToDomainMutation = (
  { __typename?: 'Mutation' }
  & { addResourceToDomain: (
    { __typename?: 'Resource' }
    & ResourceDataFragment
  ) }
);



/**
 * __useGetDomainByKeyWithConceptsQuery__
 *
 * To run a query within a React component, call `useGetDomainByKeyWithConceptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainByKeyWithConceptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainByKeyWithConceptsQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDomainByKeyWithConceptsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDomainByKeyWithConceptsQuery, GetDomainByKeyWithConceptsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDomainByKeyWithConceptsQuery, GetDomainByKeyWithConceptsQueryVariables>(Operations.getDomainByKeyWithConcepts, baseOptions);
      }
export function useGetDomainByKeyWithConceptsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDomainByKeyWithConceptsQuery, GetDomainByKeyWithConceptsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDomainByKeyWithConceptsQuery, GetDomainByKeyWithConceptsQueryVariables>(Operations.getDomainByKeyWithConcepts, baseOptions);
        }
export type GetDomainByKeyWithConceptsQueryHookResult = ReturnType<typeof useGetDomainByKeyWithConceptsQuery>;
export type GetDomainByKeyWithConceptsLazyQueryHookResult = ReturnType<typeof useGetDomainByKeyWithConceptsLazyQuery>;
export type GetDomainByKeyWithConceptsQueryResult = ApolloReactCommon.QueryResult<GetDomainByKeyWithConceptsQuery, GetDomainByKeyWithConceptsQueryVariables>;
export type AddResourceToDomainMutationFn = ApolloReactCommon.MutationFunction<AddResourceToDomainMutation, AddResourceToDomainMutationVariables>;

/**
 * __useAddResourceToDomainMutation__
 *
 * To run a mutation, you first call `useAddResourceToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddResourceToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addResourceToDomainMutation, { data, loading, error }] = useAddResourceToDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddResourceToDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddResourceToDomainMutation, AddResourceToDomainMutationVariables>) {
        return ApolloReactHooks.useMutation<AddResourceToDomainMutation, AddResourceToDomainMutationVariables>(Operations.addResourceToDomain, baseOptions);
      }
export type AddResourceToDomainMutationHookResult = ReturnType<typeof useAddResourceToDomainMutation>;
export type AddResourceToDomainMutationResult = ApolloReactCommon.MutationResult<AddResourceToDomainMutation>;
export type AddResourceToDomainMutationOptions = ApolloReactCommon.BaseMutationOptions<AddResourceToDomainMutation, AddResourceToDomainMutationVariables>;