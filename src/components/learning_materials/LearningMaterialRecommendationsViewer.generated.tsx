import * as Types from '../../graphql/types';

import * as Operations from './LearningMaterialRecommendationsViewer';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type LearningMaterialRecommendationsViewerData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, recommendationsCount?: number | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined };

export type LearningMaterialRecommendationsViewerData_Resource_Fragment = { __typename?: 'Resource', _id: string, recommendationsCount?: number | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined };

export type LearningMaterialRecommendationsViewerDataFragment = LearningMaterialRecommendationsViewerData_LearningPath_Fragment | LearningMaterialRecommendationsViewerData_Resource_Fragment;

export type RecommendLearningMaterialMutationVariables = Types.Exact<{
  learningMaterialId: Types.Scalars['String'];
}>;


export type RecommendLearningMaterialMutation = { __typename?: 'Mutation', recommendLearningMaterial: { __typename?: 'LearningPath', _id: string, recommendationsCount?: number | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined } | { __typename?: 'Resource', _id: string, recommendationsCount?: number | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined } };


export type RecommendLearningMaterialMutationFn = Apollo.MutationFunction<RecommendLearningMaterialMutation, RecommendLearningMaterialMutationVariables>;

/**
 * __useRecommendLearningMaterialMutation__
 *
 * To run a mutation, you first call `useRecommendLearningMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecommendLearningMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recommendLearningMaterialMutation, { data, loading, error }] = useRecommendLearningMaterialMutation({
 *   variables: {
 *      learningMaterialId: // value for 'learningMaterialId'
 *   },
 * });
 */
export function useRecommendLearningMaterialMutation(baseOptions?: Apollo.MutationHookOptions<RecommendLearningMaterialMutation, RecommendLearningMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecommendLearningMaterialMutation, RecommendLearningMaterialMutationVariables>(Operations.recommendLearningMaterial, options);
      }
export type RecommendLearningMaterialMutationHookResult = ReturnType<typeof useRecommendLearningMaterialMutation>;
export type RecommendLearningMaterialMutationResult = Apollo.MutationResult<RecommendLearningMaterialMutation>;
export type RecommendLearningMaterialMutationOptions = Apollo.BaseMutationOptions<RecommendLearningMaterialMutation, RecommendLearningMaterialMutationVariables>;