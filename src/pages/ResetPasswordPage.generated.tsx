import * as Types from '../graphql/types';

import * as Operations from './ResetPasswordPage';
import * as Apollo from '@apollo/client';
export type ResetPasswordMutationVariables = Types.Exact<{
  payload: Types.ResetPasswordPayload;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'ResetPasswordResponse' }
    & { currentUser: (
      { __typename?: 'CurrentUser' }
      & Pick<Types.CurrentUser, '_id'>
    ) }
  ) }
);

export type TriggerResetPasswordMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type TriggerResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { triggerResetPassword: (
    { __typename?: 'TriggerResetPasswordResponse' }
    & Pick<Types.TriggerResetPasswordResponse, 'success' | 'errorMessage'>
  ) }
);


export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(Operations.resetPassword, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export type TriggerResetPasswordMutationFn = Apollo.MutationFunction<TriggerResetPasswordMutation, TriggerResetPasswordMutationVariables>;

/**
 * __useTriggerResetPasswordMutation__
 *
 * To run a mutation, you first call `useTriggerResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTriggerResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [triggerResetPasswordMutation, { data, loading, error }] = useTriggerResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useTriggerResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<TriggerResetPasswordMutation, TriggerResetPasswordMutationVariables>) {
        return Apollo.useMutation<TriggerResetPasswordMutation, TriggerResetPasswordMutationVariables>(Operations.triggerResetPassword, baseOptions);
      }
export type TriggerResetPasswordMutationHookResult = ReturnType<typeof useTriggerResetPasswordMutation>;
export type TriggerResetPasswordMutationResult = Apollo.MutationResult<TriggerResetPasswordMutation>;
export type TriggerResetPasswordMutationOptions = Apollo.BaseMutationOptions<TriggerResetPasswordMutation, TriggerResetPasswordMutationVariables>;