import * as Types from '../../graphql/types';

import * as Operations from './LearningMaterialStarsRating';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type LearningMaterialStarsRaterData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined };

export type LearningMaterialStarsRaterData_Resource_Fragment = { __typename?: 'Resource', _id: string, consumed?: { __typename?: 'ConsumedResource', consumedAt?: any | null | undefined, openedAt?: any | null | undefined } | null | undefined };

export type LearningMaterialStarsRaterDataFragment = LearningMaterialStarsRaterData_LearningPath_Fragment | LearningMaterialStarsRaterData_Resource_Fragment;

export type RateLearningMaterialMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
  value: Types.Scalars['Float'];
}>;


export type RateLearningMaterialMutation = { __typename?: 'Mutation', rateLearningMaterial: { __typename?: 'LearningPath', _id: string, rating?: number | null | undefined } | { __typename?: 'Resource', _id: string, rating?: number | null | undefined } };


export type RateLearningMaterialMutationFn = Apollo.MutationFunction<RateLearningMaterialMutation, RateLearningMaterialMutationVariables>;

/**
 * __useRateLearningMaterialMutation__
 *
 * To run a mutation, you first call `useRateLearningMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateLearningMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateLearningMaterialMutation, { data, loading, error }] = useRateLearningMaterialMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useRateLearningMaterialMutation(baseOptions?: Apollo.MutationHookOptions<RateLearningMaterialMutation, RateLearningMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateLearningMaterialMutation, RateLearningMaterialMutationVariables>(Operations.rateLearningMaterial, options);
      }
export type RateLearningMaterialMutationHookResult = ReturnType<typeof useRateLearningMaterialMutation>;
export type RateLearningMaterialMutationResult = Apollo.MutationResult<RateLearningMaterialMutation>;
export type RateLearningMaterialMutationOptions = Apollo.BaseMutationOptions<RateLearningMaterialMutation, RateLearningMaterialMutationVariables>;