import * as Types from '../../graphql/types';

import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './NewResourcePage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type CreateResourceMutationVariables = {
  payload: Types.CreateResourcePayload
};


export type CreateResourceMutation = (
  { __typename?: 'Mutation' }
  & { createResource: (
    { __typename?: 'Resource' }
    & ResourceDataFragment
  ) }
);


export type CreateResourceMutationFn = ApolloReactCommon.MutationFunction<CreateResourceMutation, CreateResourceMutationVariables>;

/**
 * __useCreateResourceMutation__
 *
 * To run a mutation, you first call `useCreateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourceMutation, { data, loading, error }] = useCreateResourceMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateResourceMutation, CreateResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateResourceMutation, CreateResourceMutationVariables>(Operations.createResource, baseOptions);
      }
export type CreateResourceMutationHookResult = ReturnType<typeof useCreateResourceMutation>;
export type CreateResourceMutationResult = ApolloReactCommon.MutationResult<CreateResourceMutation>;
export type CreateResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateResourceMutation, CreateResourceMutationVariables>;