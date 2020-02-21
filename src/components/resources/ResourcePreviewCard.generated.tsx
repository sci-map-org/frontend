import * as Types from '../../graphql/types';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './ResourcePreviewCard';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type SetResourceConsumedMutationVariables = {
  resourceId: Types.Scalars['String'],
  consumed: Types.Scalars['Boolean']
};


export type SetResourceConsumedMutation = (
  { __typename?: 'Mutation' }
  & { setResourcesConsumed: Array<(
    { __typename?: 'Resource' }
    & ResourcePreviewDataFragment
  )> }
);


export type SetResourceConsumedMutationFn = ApolloReactCommon.MutationFunction<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>;

/**
 * __useSetResourceConsumedMutation__
 *
 * To run a mutation, you first call `useSetResourceConsumedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetResourceConsumedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setResourceConsumedMutation, { data, loading, error }] = useSetResourceConsumedMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      consumed: // value for 'consumed'
 *   },
 * });
 */
export function useSetResourceConsumedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>) {
        return ApolloReactHooks.useMutation<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>(Operations.setResourceConsumed, baseOptions);
      }
export type SetResourceConsumedMutationHookResult = ReturnType<typeof useSetResourceConsumedMutation>;
export type SetResourceConsumedMutationResult = ApolloReactCommon.MutationResult<SetResourceConsumedMutation>;
export type SetResourceConsumedMutationOptions = ApolloReactCommon.BaseMutationOptions<SetResourceConsumedMutation, SetResourceConsumedMutationVariables>;