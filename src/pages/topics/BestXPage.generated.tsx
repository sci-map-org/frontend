import * as Types from '../../graphql/types';

import * as Operations from './BestXPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetBestXPageDataQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.TopicLearningMaterialsOptions;
}>;


export type GetBestXPageDataQuery = { __typename?: 'Query', getTopicByKey: { __typename?: 'Topic', _id: string, key: string, name: string, description?: string | null | undefined, learningMaterials?: { __typename?: 'TopicLearningMaterialsResults', items: Array<{ __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } | { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, recommendationsCount?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, key: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, key: string, name: string }> | null | undefined, recommendedBy?: Array<{ __typename?: 'UserRecommendedLearningMaterial', recommendedAt: any, user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined }> } | null | undefined } };



/**
 * __useGetBestXPageDataQuery__
 *
 * To run a query within a React component, call `useGetBestXPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBestXPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBestXPageDataQuery({
 *   variables: {
 *      key: // value for 'key'
 *      learningMaterialsOptions: // value for 'learningMaterialsOptions'
 *   },
 * });
 */
export function useGetBestXPageDataQuery(baseOptions: Apollo.QueryHookOptions<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>(Operations.getBestXPageData, options);
      }
export function useGetBestXPageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>(Operations.getBestXPageData, options);
        }
export type GetBestXPageDataQueryHookResult = ReturnType<typeof useGetBestXPageDataQuery>;
export type GetBestXPageDataLazyQueryHookResult = ReturnType<typeof useGetBestXPageDataLazyQuery>;
export type GetBestXPageDataQueryResult = Apollo.QueryResult<GetBestXPageDataQuery, GetBestXPageDataQueryVariables>;