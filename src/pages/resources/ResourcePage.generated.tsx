import * as Types from '../../graphql/types';

import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './ResourcePage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type AddTagsToResourceResourceEditorMutationVariables = {
  resourceId: Types.Scalars['String'],
  tags: Array<Types.Scalars['String']>
};


export type AddTagsToResourceResourceEditorMutation = (
  { __typename?: 'Mutation' }
  & { addTagsToResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { tags: Types.Maybe<Array<(
      { __typename?: 'ResourceTag' }
      & Pick<Types.ResourceTag, 'name'>
    )>> }
  ) }
);

export type RemoveTagsFromResourceResourceEditorMutationVariables = {
  resourceId: Types.Scalars['String'],
  tags: Array<Types.Scalars['String']>
};


export type RemoveTagsFromResourceResourceEditorMutation = (
  { __typename?: 'Mutation' }
  & { removeTagsFromResource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id'>
    & { tags: Types.Maybe<Array<(
      { __typename?: 'ResourceTag' }
      & Pick<Types.ResourceTag, 'name'>
    )>> }
  ) }
);

export type GetResourceResourcePageQueryVariables = {
  id: Types.Scalars['String']
};


export type GetResourceResourcePageQuery = (
  { __typename?: 'Query' }
  & { getResourceById: (
    { __typename?: 'Resource' }
    & { coveredConcepts: Types.Maybe<(
      { __typename?: 'ResourceCoveredConceptsResults' }
      & { items: Array<(
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id' | 'name'>
        & { domain: Types.Maybe<(
          { __typename?: 'Domain' }
          & Pick<Types.Domain, '_id' | 'key' | 'name'>
        )> }
      )> }
    )>, domains: Types.Maybe<(
      { __typename?: 'ResourceDomainsResults' }
      & { items: Array<(
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'key' | 'name'>
        & { concepts: Types.Maybe<(
          { __typename?: 'DomainConceptsResults' }
          & { items: Array<(
            { __typename?: 'Concept' }
            & Pick<Types.Concept, '_id' | 'name'>
          )> }
        )> }
      )> }
    )> }
    & ResourceDataFragment
  ) }
);


export type AddTagsToResourceResourceEditorMutationFn = ApolloReactCommon.MutationFunction<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>;

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
export function useAddTagsToResourceResourceEditorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>(Operations.addTagsToResourceResourceEditor, baseOptions);
      }
export type AddTagsToResourceResourceEditorMutationHookResult = ReturnType<typeof useAddTagsToResourceResourceEditorMutation>;
export type AddTagsToResourceResourceEditorMutationResult = ApolloReactCommon.MutationResult<AddTagsToResourceResourceEditorMutation>;
export type AddTagsToResourceResourceEditorMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTagsToResourceResourceEditorMutation, AddTagsToResourceResourceEditorMutationVariables>;
export type RemoveTagsFromResourceResourceEditorMutationFn = ApolloReactCommon.MutationFunction<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>;

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
export function useRemoveTagsFromResourceResourceEditorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>(Operations.removeTagsFromResourceResourceEditor, baseOptions);
      }
export type RemoveTagsFromResourceResourceEditorMutationHookResult = ReturnType<typeof useRemoveTagsFromResourceResourceEditorMutation>;
export type RemoveTagsFromResourceResourceEditorMutationResult = ApolloReactCommon.MutationResult<RemoveTagsFromResourceResourceEditorMutation>;
export type RemoveTagsFromResourceResourceEditorMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTagsFromResourceResourceEditorMutation, RemoveTagsFromResourceResourceEditorMutationVariables>;

/**
 * __useGetResourceResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceResourcePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(Operations.getResourceResourcePage, baseOptions);
      }
export function useGetResourceResourcePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(Operations.getResourceResourcePage, baseOptions);
        }
export type GetResourceResourcePageQueryHookResult = ReturnType<typeof useGetResourceResourcePageQuery>;
export type GetResourceResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceResourcePageLazyQuery>;
export type GetResourceResourcePageQueryResult = ApolloReactCommon.QueryResult<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>;