import * as Types from '../../graphql/types';

import * as Operations from './ConceptList';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type UpdateConceptBelongsToDomainIndexMutationVariables = Exact<{
  conceptId: Types.Scalars['String'];
  domainId: Types.Scalars['String'];
  index: Types.Scalars['Float'];
}>;


export type UpdateConceptBelongsToDomainIndexMutation = (
  { __typename?: 'Mutation' }
  & { updateConceptBelongsToDomain: (
    { __typename?: 'ConceptBelongsToDomain' }
    & Pick<Types.ConceptBelongsToDomain, 'index'>
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