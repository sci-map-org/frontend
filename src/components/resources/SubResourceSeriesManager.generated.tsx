import * as Types from '../../graphql/types';

import * as Operations from './SubResourceSeriesManager';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateSubResourceSeriesMutationVariables = Types.Exact<{
  parentResourceId: Types.Scalars['String'];
  subResourceId: Types.Scalars['String'];
}>;


export type CreateSubResourceSeriesMutation = { __typename?: 'Mutation', createSubResourceSeries: { __typename?: 'SubResourceSeriesCreatedResult', seriesParentResource: { __typename?: 'Resource', _id: string, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined }> | null | undefined } } };

export type AddSubResourceToSeriesMutationVariables = Types.Exact<{
  parentResourceId: Types.Scalars['String'];
  previousResourceId: Types.Scalars['String'];
  subResourceId: Types.Scalars['String'];
}>;


export type AddSubResourceToSeriesMutation = { __typename?: 'Mutation', addSubResourceToSeries: { __typename?: 'SubResourceSeriesCreatedResult', seriesParentResource: { __typename?: 'Resource', _id: string, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, nextResource?: { __typename?: 'Resource', _id: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined }> | null | undefined } } };


export type CreateSubResourceSeriesMutationFn = Apollo.MutationFunction<CreateSubResourceSeriesMutation, CreateSubResourceSeriesMutationVariables>;

/**
 * __useCreateSubResourceSeriesMutation__
 *
 * To run a mutation, you first call `useCreateSubResourceSeriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubResourceSeriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubResourceSeriesMutation, { data, loading, error }] = useCreateSubResourceSeriesMutation({
 *   variables: {
 *      parentResourceId: // value for 'parentResourceId'
 *      subResourceId: // value for 'subResourceId'
 *   },
 * });
 */
export function useCreateSubResourceSeriesMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubResourceSeriesMutation, CreateSubResourceSeriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubResourceSeriesMutation, CreateSubResourceSeriesMutationVariables>(Operations.createSubResourceSeries, options);
      }
export type CreateSubResourceSeriesMutationHookResult = ReturnType<typeof useCreateSubResourceSeriesMutation>;
export type CreateSubResourceSeriesMutationResult = Apollo.MutationResult<CreateSubResourceSeriesMutation>;
export type CreateSubResourceSeriesMutationOptions = Apollo.BaseMutationOptions<CreateSubResourceSeriesMutation, CreateSubResourceSeriesMutationVariables>;
export type AddSubResourceToSeriesMutationFn = Apollo.MutationFunction<AddSubResourceToSeriesMutation, AddSubResourceToSeriesMutationVariables>;

/**
 * __useAddSubResourceToSeriesMutation__
 *
 * To run a mutation, you first call `useAddSubResourceToSeriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubResourceToSeriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubResourceToSeriesMutation, { data, loading, error }] = useAddSubResourceToSeriesMutation({
 *   variables: {
 *      parentResourceId: // value for 'parentResourceId'
 *      previousResourceId: // value for 'previousResourceId'
 *      subResourceId: // value for 'subResourceId'
 *   },
 * });
 */
export function useAddSubResourceToSeriesMutation(baseOptions?: Apollo.MutationHookOptions<AddSubResourceToSeriesMutation, AddSubResourceToSeriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSubResourceToSeriesMutation, AddSubResourceToSeriesMutationVariables>(Operations.addSubResourceToSeries, options);
      }
export type AddSubResourceToSeriesMutationHookResult = ReturnType<typeof useAddSubResourceToSeriesMutation>;
export type AddSubResourceToSeriesMutationResult = Apollo.MutationResult<AddSubResourceToSeriesMutation>;
export type AddSubResourceToSeriesMutationOptions = Apollo.BaseMutationOptions<AddSubResourceToSeriesMutation, AddSubResourceToSeriesMutationVariables>;