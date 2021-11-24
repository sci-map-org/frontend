import * as Types from '../../graphql/types';

import { ResourceDataFragment, ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './EditResourcePage';
import * as Apollo from '@apollo/client';
export type UpdateResourceResourcePageMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  payload: Types.UpdateResourcePayload;
}>;


export type UpdateResourceResourcePageMutation = (
  { __typename?: 'Mutation' }
  & { updateResource: (
    { __typename?: 'Resource' }
    & ResourceDataFragment
  ) }
);

export type GetResourceEditResourcePageQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourceEditResourcePageQuery = (
  { __typename?: 'Query' }
  & { getResourceById: (
    { __typename?: 'Resource' }
    & { createdBy?: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, '_id'>
    )> }
    & ResourceDataFragment
  ) }
);


export type UpdateResourceResourcePageMutationFn = Apollo.MutationFunction<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>;

/**
 * __useUpdateResourceResourcePageMutation__
 *
 * To run a mutation, you first call `useUpdateResourceResourcePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResourceResourcePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResourceResourcePageMutation, { data, loading, error }] = useUpdateResourceResourcePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateResourceResourcePageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>) {
        return Apollo.useMutation<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>(Operations.updateResourceResourcePage, baseOptions);
      }
export type UpdateResourceResourcePageMutationHookResult = ReturnType<typeof useUpdateResourceResourcePageMutation>;
export type UpdateResourceResourcePageMutationResult = Apollo.MutationResult<UpdateResourceResourcePageMutation>;
export type UpdateResourceResourcePageMutationOptions = Apollo.BaseMutationOptions<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>;

/**
 * __useGetResourceEditResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceEditResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceEditResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceEditResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceEditResourcePageQuery(baseOptions: Apollo.QueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
        return Apollo.useQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, baseOptions);
      }
export function useGetResourceEditResourcePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
          return Apollo.useLazyQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, baseOptions);
        }
export type GetResourceEditResourcePageQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageQuery>;
export type GetResourceEditResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageLazyQuery>;
export type GetResourceEditResourcePageQueryResult = Apollo.QueryResult<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>;