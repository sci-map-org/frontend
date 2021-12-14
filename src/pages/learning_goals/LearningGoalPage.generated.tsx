import * as Types from '../../graphql/types';

import * as Operations from './LearningGoalPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetLearningGoalPageDataQueryVariables = Types.Exact<{
  learningGoalKey: Types.Scalars['String'];
}>;


export type GetLearningGoalPageDataQuery = { __typename?: 'Query', getLearningGoalByKey: { __typename?: 'LearningGoal', _id: string, rating?: number | null | undefined, key: string, name: string, hidden: boolean, type: Types.LearningGoalType, description?: string | null | undefined, publishedAt?: any | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, startedBy?: { __typename?: 'LearningGoalStartedByResults', count: number, items: Array<{ __typename?: 'LearningGoalStartedByItem', user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> } | null | undefined, requiredSubGoals?: Array<{ __typename?: 'SubGoalItem', strength: number, subGoal: { __typename?: 'LearningGoal', type: Types.LearningGoalType, _id: string, key: string, name: string } | { __typename?: 'Topic', _id: string } }> | null | undefined, started?: { __typename?: 'LearningGoalStarted', startedAt: any } | null | undefined, progress?: { __typename?: 'LearningGoalProgress', level: number } | null | undefined, requiredInGoals?: Array<{ __typename?: 'RequiredInGoalItem', strength: number, goal: { __typename?: 'LearningGoal', _id: string, key: string, name: string, type: Types.LearningGoalType } }> | null | undefined, relevantLearningMaterials?: { __typename?: 'LearningGoalRelevantLearningMaterialsResults', items: Array<{ __typename?: 'LearningGoalRelevantLearningMaterialsItem', coverage?: number | null | undefined, learningMaterial: { __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } | { __typename?: 'Resource', _id: string, name: string, type: Types.ResourceType, mediaType: Types.ResourceMediaType, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, upvotes?: number | null | undefined, rating?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined } }> } | null | undefined } };



/**
 * __useGetLearningGoalPageDataQuery__
 *
 * To run a query within a React component, call `useGetLearningGoalPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLearningGoalPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLearningGoalPageDataQuery({
 *   variables: {
 *      learningGoalKey: // value for 'learningGoalKey'
 *   },
 * });
 */
export function useGetLearningGoalPageDataQuery(baseOptions: Apollo.QueryHookOptions<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>(Operations.getLearningGoalPageData, options);
      }
export function useGetLearningGoalPageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>(Operations.getLearningGoalPageData, options);
        }
export type GetLearningGoalPageDataQueryHookResult = ReturnType<typeof useGetLearningGoalPageDataQuery>;
export type GetLearningGoalPageDataLazyQueryHookResult = ReturnType<typeof useGetLearningGoalPageDataLazyQuery>;
export type GetLearningGoalPageDataQueryResult = Apollo.QueryResult<GetLearningGoalPageDataQuery, GetLearningGoalPageDataQueryVariables>;