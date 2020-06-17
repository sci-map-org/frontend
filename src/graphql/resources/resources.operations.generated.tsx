import * as Types from '../types';

import * as Operations from './resources.operations';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type VoteResourceMutationVariables = Exact<{
  resourceId: Types.Scalars['String'];
  value: Types.ResourceVoteValue;
}>;


export type VoteResourceMutation = (
  { __typename?: 'Mutation' }
  & { voteResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'upvotes'>
  ) }
);


export type VoteResourceMutationFn = ApolloReactCommon.MutationFunction<VoteResourceMutation, VoteResourceMutationVariables>;

/**
 * __useVoteResourceMutation__
 *
 * To run a mutation, you first call `useVoteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteResourceMutation, { data, loading, error }] = useVoteResourceMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteResourceMutation, VoteResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<VoteResourceMutation, VoteResourceMutationVariables>(Operations.voteResource, baseOptions);
      }
export type VoteResourceMutationHookResult = ReturnType<typeof useVoteResourceMutation>;
export type VoteResourceMutationResult = ApolloReactCommon.MutationResult<VoteResourceMutation>;
export type VoteResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteResourceMutation, VoteResourceMutationVariables>;