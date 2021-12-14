import * as Types from '../../../graphql/types';

import * as Operations from './CurrentUserLearningPathsPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetCurrentUserLearningPathsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserLearningPathsPageQuery = { __typename?: 'Query', currentUser?: { __typename?: 'CurrentUser', _id: string, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined } }> | null | undefined, createdLearningPaths?: Array<{ __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, key: string, public: boolean, name: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined }> | null | undefined } | null | undefined };



/**
 * __useGetCurrentUserLearningPathsPageQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserLearningPathsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserLearningPathsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserLearningPathsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserLearningPathsPageQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>(Operations.getCurrentUserLearningPathsPage, options);
      }
export function useGetCurrentUserLearningPathsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>(Operations.getCurrentUserLearningPathsPage, options);
        }
export type GetCurrentUserLearningPathsPageQueryHookResult = ReturnType<typeof useGetCurrentUserLearningPathsPageQuery>;
export type GetCurrentUserLearningPathsPageLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLearningPathsPageLazyQuery>;
export type GetCurrentUserLearningPathsPageQueryResult = Apollo.QueryResult<GetCurrentUserLearningPathsPageQuery, GetCurrentUserLearningPathsPageQueryVariables>;