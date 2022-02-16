import * as Types from '../../graphql/types';

import * as Operations from './EditResourcePage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateResourceResourcePageMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  payload: Types.UpdateResourcePayload;
}>;


export type UpdateResourceResourcePageMutation = { __typename?: 'Mutation', updateResource: { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } };

export type GetResourceEditResourcePageQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourceEditResourcePageQuery = { __typename?: 'Query', getResourceById: { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, createdBy?: { __typename?: 'User', _id: string } | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } };


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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateResourceResourcePageMutation, UpdateResourceResourcePageMutationVariables>(Operations.updateResourceResourcePage, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, options);
      }
export function useGetResourceEditResourcePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, options);
        }
export type GetResourceEditResourcePageQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageQuery>;
export type GetResourceEditResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageLazyQuery>;
export type GetResourceEditResourcePageQueryResult = Apollo.QueryResult<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>;