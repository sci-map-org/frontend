import * as Types from '../../graphql/types';

import * as Operations from './ResourceStarsRating';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type RateResourceMutationVariables = Exact<{
  resourceId: Types.Scalars['String'];
  value: Types.Scalars['Float'];
}>;


export type RateResourceMutation = (
  { __typename?: 'Mutation' }
  & { rateResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'rating'>
  ) }
);


export type RateResourceMutationFn = ApolloReactCommon.MutationFunction<RateResourceMutation, RateResourceMutationVariables>;

/**
 * __useRateResourceMutation__
 *
 * To run a mutation, you first call `useRateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateResourceMutation, { data, loading, error }] = useRateResourceMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useRateResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RateResourceMutation, RateResourceMutationVariables>) {
        return ApolloReactHooks.useMutation<RateResourceMutation, RateResourceMutationVariables>(Operations.rateResource, baseOptions);
      }
export type RateResourceMutationHookResult = ReturnType<typeof useRateResourceMutation>;
export type RateResourceMutationResult = ApolloReactCommon.MutationResult<RateResourceMutation>;
export type RateResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<RateResourceMutation, RateResourceMutationVariables>;