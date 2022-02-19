import * as Types from '../../graphql/types';

import * as Operations from './ResourceEditor';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateResourceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  payload: Types.UpdateResourcePayload;
}>;


export type UpdateResourceMutation = { __typename?: 'Mutation', updateResource: { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } };


export type UpdateResourceMutationFn = Apollo.MutationFunction<UpdateResourceMutation, UpdateResourceMutationVariables>;

/**
 * __useUpdateResourceMutation__
 *
 * To run a mutation, you first call `useUpdateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResourceMutation, { data, loading, error }] = useUpdateResourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateResourceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateResourceMutation, UpdateResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateResourceMutation, UpdateResourceMutationVariables>(Operations.updateResource, options);
      }
export type UpdateResourceMutationHookResult = ReturnType<typeof useUpdateResourceMutation>;
export type UpdateResourceMutationResult = Apollo.MutationResult<UpdateResourceMutation>;
export type UpdateResourceMutationOptions = Apollo.BaseMutationOptions<UpdateResourceMutation, UpdateResourceMutationVariables>;