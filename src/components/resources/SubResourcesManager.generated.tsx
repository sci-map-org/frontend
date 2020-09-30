import * as Types from '../../graphql/types';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './SubResourcesManager';
import * as Apollo from '@apollo/client';
export type AddSubResourceSubResourcesManagerMutationVariables = Types.Exact<{
  parentResourceId: Types.Scalars['String'];
  subResourceId: Types.Scalars['String'];
}>;


export type AddSubResourceSubResourcesManagerMutation = (
  { __typename?: 'Mutation' }
  & { addSubResource: (
    { __typename?: 'SubResourceCreatedResult' }
    & { parentResource: (
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id'>
      & { subResources?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )>> }
    ) }
  ) }
);


export type AddSubResourceSubResourcesManagerMutationFn = Apollo.MutationFunction<AddSubResourceSubResourcesManagerMutation, AddSubResourceSubResourcesManagerMutationVariables>;

/**
 * __useAddSubResourceSubResourcesManagerMutation__
 *
 * To run a mutation, you first call `useAddSubResourceSubResourcesManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubResourceSubResourcesManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubResourceSubResourcesManagerMutation, { data, loading, error }] = useAddSubResourceSubResourcesManagerMutation({
 *   variables: {
 *      parentResourceId: // value for 'parentResourceId'
 *      subResourceId: // value for 'subResourceId'
 *   },
 * });
 */
export function useAddSubResourceSubResourcesManagerMutation(baseOptions?: Apollo.MutationHookOptions<AddSubResourceSubResourcesManagerMutation, AddSubResourceSubResourcesManagerMutationVariables>) {
        return Apollo.useMutation<AddSubResourceSubResourcesManagerMutation, AddSubResourceSubResourcesManagerMutationVariables>(Operations.addSubResourceSubResourcesManager, baseOptions);
      }
export type AddSubResourceSubResourcesManagerMutationHookResult = ReturnType<typeof useAddSubResourceSubResourcesManagerMutation>;
export type AddSubResourceSubResourcesManagerMutationResult = Apollo.MutationResult<AddSubResourceSubResourcesManagerMutation>;
export type AddSubResourceSubResourcesManagerMutationOptions = Apollo.BaseMutationOptions<AddSubResourceSubResourcesManagerMutation, AddSubResourceSubResourcesManagerMutationVariables>;