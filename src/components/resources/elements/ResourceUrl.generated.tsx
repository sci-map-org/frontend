import * as Types from '../../../graphql/types';

import * as Operations from './ResourceUrl';
import * as Apollo from '@apollo/client';
export type SetResourceOpenedMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
}>;


export type SetResourceOpenedMutation = (
  { __typename?: 'Mutation' }
  & { setResourcesConsumed: Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { consumed?: Types.Maybe<(
      { __typename?: 'ConsumedResource' }
      & Pick<Types.ConsumedResource, 'openedAt'>
    )> }
  )> }
);


export type SetResourceOpenedMutationFn = Apollo.MutationFunction<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>;

/**
 * __useSetResourceOpenedMutation__
 *
 * To run a mutation, you first call `useSetResourceOpenedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetResourceOpenedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setResourceOpenedMutation, { data, loading, error }] = useSetResourceOpenedMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useSetResourceOpenedMutation(baseOptions?: Apollo.MutationHookOptions<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>) {
        return Apollo.useMutation<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>(Operations.setResourceOpened, baseOptions);
      }
export type SetResourceOpenedMutationHookResult = ReturnType<typeof useSetResourceOpenedMutation>;
export type SetResourceOpenedMutationResult = Apollo.MutationResult<SetResourceOpenedMutation>;
export type SetResourceOpenedMutationOptions = Apollo.BaseMutationOptions<SetResourceOpenedMutation, SetResourceOpenedMutationVariables>;