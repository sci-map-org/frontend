import * as Types from '../graphql/types';

import * as Operations from './HomePage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetHomePageDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHomePageDataQuery = { __typename?: 'Query', getHomePageData: { __typename?: 'GetHomePageDataResults', currentUser?: { __typename?: 'CurrentUser', _id: string, key: string, email: string, displayName: string, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string, public: boolean, rating?: number | null | undefined, description?: string | null | undefined, durationSeconds?: number | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined } }> | null | undefined, consumedResources?: { __typename?: 'UserConsumedResourcesResult', count: number, items: Array<{ __typename?: 'UserConsumedResourceItem', consumedAt?: any | null | undefined, openedAt?: any | null | undefined, resource: { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, recommendationsCount?: number | null | undefined, recommended?: { __typename?: 'LearningMaterialRecommended', recommendedAt: any } | null | undefined } }> } | null | undefined } | null | undefined, recommendedLearningPaths: Array<{ __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, outro?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined }> } };



/**
 * __useGetHomePageDataQuery__
 *
 * To run a query within a React component, call `useGetHomePageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomePageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomePageDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomePageDataQuery(baseOptions?: Apollo.QueryHookOptions<GetHomePageDataQuery, GetHomePageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHomePageDataQuery, GetHomePageDataQueryVariables>(Operations.getHomePageData, options);
      }
export function useGetHomePageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHomePageDataQuery, GetHomePageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHomePageDataQuery, GetHomePageDataQueryVariables>(Operations.getHomePageData, options);
        }
export type GetHomePageDataQueryHookResult = ReturnType<typeof useGetHomePageDataQuery>;
export type GetHomePageDataLazyQueryHookResult = ReturnType<typeof useGetHomePageDataLazyQuery>;
export type GetHomePageDataQueryResult = Apollo.QueryResult<GetHomePageDataQuery, GetHomePageDataQueryVariables>;