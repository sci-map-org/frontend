import * as Types from '../../../graphql/types';

import * as Operations from './TopicPageLearningMaterialsFeed';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTopicRecommendedLearningMaterialsQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.TopicLearningMaterialsOptions;
}>;


export type GetTopicRecommendedLearningMaterialsQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, learningMaterialsTotalCount?: number | null | undefined, description?: string | null | undefined, key: string, name: string, context?: string | null | undefined, level?: number | null | undefined, subTopicsTotalCount?: number | null | undefined, learningMaterials?: { __typename?: 'TopicLearningMaterialsResults', totalCount: number, items: Array<{ __typename?: 'LearningPath', _id: string, key: string, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, createdAt: any, recommendationsCount?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined } | { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, createdAt: any, recommendationsCount?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, key: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, key: string, name: string }> | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined }>, availableTagFilters: Array<{ __typename?: 'TagFilter', name: string, count: number }> } | null | undefined, learningMaterialsAvailableTypeFilters?: { __typename?: 'TopicLearningMaterialsAvailableTypeFilters', types: Array<Types.ResourceType>, learningPathsCount: number, leq30minCount: number, geq30minCount: number } | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined } };



/**
 * __useGetTopicRecommendedLearningMaterialsQuery__
 *
 * To run a query within a React component, call `useGetTopicRecommendedLearningMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicRecommendedLearningMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicRecommendedLearningMaterialsQuery({
 *   variables: {
 *      key: // value for 'key'
 *      learningMaterialsOptions: // value for 'learningMaterialsOptions'
 *   },
 * });
 */
export function useGetTopicRecommendedLearningMaterialsQuery(baseOptions: Apollo.QueryHookOptions<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>(Operations.getTopicRecommendedLearningMaterials, options);
      }
export function useGetTopicRecommendedLearningMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>(Operations.getTopicRecommendedLearningMaterials, options);
        }
export type GetTopicRecommendedLearningMaterialsQueryHookResult = ReturnType<typeof useGetTopicRecommendedLearningMaterialsQuery>;
export type GetTopicRecommendedLearningMaterialsLazyQueryHookResult = ReturnType<typeof useGetTopicRecommendedLearningMaterialsLazyQuery>;
export type GetTopicRecommendedLearningMaterialsQueryResult = Apollo.QueryResult<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>;