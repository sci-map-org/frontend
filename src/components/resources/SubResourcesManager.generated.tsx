import * as Types from '../../graphql/types';

import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './SubResourcesManager';
import * as Apollo from '@apollo/client';
export type AddSubResourceMutationVariables = Types.Exact<{
  parentResourceId: Types.Scalars['String'];
  subResourceId: Types.Scalars['String'];
}>;


export type AddSubResourceMutation = (
  { __typename?: 'Mutation' }
  & { addSubResource: (
    { __typename?: 'SubResourceCreatedResult' }
    & { parentResource: (
      { __typename?: 'Resource' }
      & { subResources?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & Pick<Types.Resource, '_id'>
      )>> }
      & ResourceDataFragment
    ), subResource: (
      { __typename?: 'Resource' }
      & { parentResources?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & Pick<Types.Resource, '_id'>
      )>> }
      & ResourceDataFragment
    ) }
  ) }
);


export type AddSubResourceMutationFn = Apollo.MutationFunction<AddSubResourceMutation, AddSubResourceMutationVariables>;

/**
 * __useAddSubResourceMutation__
 *
 * To run a mutation, you first call `useAddSubResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubResourceMutation, { data, loading, error }] = useAddSubResourceMutation({
 *   variables: {
 *      parentResourceId: // value for 'parentResourceId'
 *      subResourceId: // value for 'subResourceId'
 *   },
 * });
 */
export function useAddSubResourceMutation(baseOptions?: Apollo.MutationHookOptions<AddSubResourceMutation, AddSubResourceMutationVariables>) {
        return Apollo.useMutation<AddSubResourceMutation, AddSubResourceMutationVariables>(Operations.addSubResource, baseOptions);
      }
export type AddSubResourceMutationHookResult = ReturnType<typeof useAddSubResourceMutation>;
export type AddSubResourceMutationResult = Apollo.MutationResult<AddSubResourceMutation>;
export type AddSubResourceMutationOptions = Apollo.BaseMutationOptions<AddSubResourceMutation, AddSubResourceMutationVariables>;