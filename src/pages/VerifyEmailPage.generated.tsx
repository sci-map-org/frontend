import * as Types from '../graphql/types';

import * as Operations from './VerifyEmailPage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Types.Scalars['String'];
}>;


export type VerifyEmailAddressMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmailAddress: (
    { __typename?: 'VerifyEmailResponse' }
    & Pick<Types.VerifyEmailResponse, 'email'>
  ) }
);


export type VerifyEmailAddressMutationFn = ApolloReactCommon.MutationFunction<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;

/**
 * __useVerifyEmailAddressMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAddressMutation, { data, loading, error }] = useVerifyEmailAddressMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>(Operations.verifyEmailAddress, baseOptions);
      }
export type VerifyEmailAddressMutationHookResult = ReturnType<typeof useVerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationResult = ApolloReactCommon.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;