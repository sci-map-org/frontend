import * as Types from '../../../graphql/types';

import * as Operations from './TopicPageLearningMaterialsFeed';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTopicRecommendedLearningMaterialsQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.TopicLearningMaterialsOptions;
}>;


export type GetTopicRecommendedLearningMaterialsQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, learningMaterialsTotalCount?: number | null | undefined, description?: string | null | undefined, key: string, name: string, context?: string | null | undefined, level?: number | null | undefined, learningMaterials?: { __typename?: 'TopicLearningMaterialsResults', totalCount: number, items: Array<{ __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } | { __typename?: 'Resource', _id: string, name: string, type: Types.ResourceType, mediaType: Types.ResourceMediaType, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, upvotes?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined }>, availableFilters?: { __typename?: 'TopicLearningMaterialsAvailableFilters', types: Array<Types.ResourceType>, tagFilters: Array<{ __typename?: 'TagFilter', name: string, count: number }> } | null | undefined } | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined } };



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