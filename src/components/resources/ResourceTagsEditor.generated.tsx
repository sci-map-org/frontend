import * as Types from '../../graphql/types';

import * as Operations from './ResourceTagsEditor';
import * as Apollo from '@apollo/client';
export type AddTagsToResourceResourceEditorMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
  tags: Array<Types.Scalars['String']>;
}>;


export type AddTagsToResourceResourceEditorMutation = (
  { __typename?: 'Mutation' }
  & { addTagsToResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { tags?: Types.Maybe<Array<(
      { __typename?: 'ResourceTag' }
      & Pick<Types.ResourceTag, 'name'>
    )>> }
  ) }
);

export type RemoveTagsFromResourceResourceEditorMutationVariables = Types.Exact<{
  resourceId: Types.Scalars['String'];
  tags: Array<Types.Scalars['String']>;
}>;


export type RemoveTagsFromResourceResourceEditorMutation = (
  { __typename?: 'Mutation' }
  & { removeTagsFromResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { tags?: Types.Maybe<Array<(
      { __typename?: 'ResourceTag' }
      & Pick<Types.ResourceTag, 'name'>
    )>> }
  ) }
);


export type AddTagsToResourceResourceEditorMutationFn = Apollo.MutationFunction<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>;

/**
 * __useAddTagsToResourceResourceEditorMutation__
 *
 * To run a mutation, you first call `useAddTagsToResourceResourceEditorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagsToResourceResourceEditorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagsToResourceResourceEditorMutation, { data, loading, error }] = useAddTagsToResourceResourceEditorMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddTagsToResourceResourceEditorMutation(baseOptions?: Apollo.MutationHookOptions<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>) {
        return Apollo.useMutation<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>(Operations.addTagsToResourceResourceEditor, baseOptions);
      }
export type AddTagsToResourceResourceEditorMutationHookResult = ReturnType<typeof useAddTagsToResourceResourceEditorMutation>;
export type AddTagsToResourceResourceEditorMutationResult = Apollo.MutationResult<AddTagsToResourceResourceEditorMutation>;
export type AddTagsToResourceResourceEditorMutationOptions = Apollo.BaseMutationOptions<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>;
export type RemoveTagsFromResourceResourceEditorMutationFn = Apollo.MutationFunction<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>;

/**
 * __useRemoveTagsFromResourceResourceEditorMutation__
 *
 * To run a mutation, you first call `useRemoveTagsFromResourceResourceEditorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagsFromResourceResourceEditorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagsFromResourceResourceEditorMutation, { data, loading, error }] = useRemoveTagsFromResourceResourceEditorMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useRemoveTagsFromResourceResourceEditorMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>) {
        return Apollo.useMutation<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>(Operations.removeTagsFromResourceResourceEditor, baseOptions);
      }
export type RemoveTagsFromResourceResourceEditorMutationHookResult = ReturnType<typeof useRemoveTagsFromResourceResourceEditorMutation>;
export type RemoveTagsFromResourceResourceEditorMutationResult = Apollo.MutationResult<RemoveTagsFromResourceResourceEditorMutation>;
export type RemoveTagsFromResourceResourceEditorMutationOptions = Apollo.BaseMutationOptions<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>;