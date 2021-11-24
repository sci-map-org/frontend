import * as Types from '../../graphql/types';

import { ResourceDataFragment, ResourcePreviewCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './SubResourceSeriesManager';
import * as Apollo from '@apollo/client';
export type CreateSubResourceSeriesMutationVariables = Types.Exact<{
  parentResourceId: Types.Scalars['String'];
  subResourceId: Types.Scalars['String'];
}>;


export type CreateSubResourceSeriesMutation = (
  { __typename?: 'Mutation' }
  & { createSubResourceSeries: (
    { __typename?: 'SubResourceSeriesCreatedResult' }
    & { seriesParentResource: (
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id'>
      & { subResourceSeries?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & ResourceDataFragment
      )>> }
    ) }
  ) }
);

export type AddSubResourceToSeriesMutationVariables = Types.Exact<{
  parentResourceId: Types.Scalars['String'];
  previousResourceId: Types.Scalars['String'];
  subResourceId: Types.Scalars['String'];
}>;


export type AddSubResourceToSeriesMutation = (
  { __typename?: 'Mutation' }
  & { addSubResourceToSeries: (
    { __typename?: 'SubResourceSeriesCreatedResult' }
    & { seriesParentResource: (
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id'>
      & { subResourceSeries?: Types.Maybe<Array<(
        { __typename?: 'Resource' }
        & { nextResource?: Types.Maybe<(
          { __typename?: 'Resource' }
          & ResourceDataFragment
        )> }
        & ResourceDataFragment
      )>> }
    ) }
  ) }
);


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
        return Apollo.useMutation<CreateSubResourceSeriesMutation, CreateSubResourceSeriesMutationVariables>(Operations.createSubResourceSeries, baseOptions);
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
        return Apollo.useMutation<AddSubResourceToSeriesMutation, AddSubResourceToSeriesMutationVariables>(Operations.addSubResourceToSeries, baseOptions);
      }
export type AddSubResourceToSeriesMutationHookResult = ReturnType<typeof useAddSubResourceToSeriesMutation>;
export type AddSubResourceToSeriesMutationResult = Apollo.MutationResult<AddSubResourceToSeriesMutation>;
export type AddSubResourceToSeriesMutationOptions = Apollo.BaseMutationOptions<AddSubResourceToSeriesMutation, AddSubResourceToSeriesMutationVariables>;