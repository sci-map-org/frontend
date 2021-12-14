import * as Types from '../../graphql/types';

import * as Operations from './LearningPathPage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetLearningPathPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetLearningPathPageQuery = { __typename?: 'Query', getLearningPathByKey: { __typename?: 'LearningPath', rating?: number | null | undefined, _id: string, durationSeconds?: number | null | undefined, key: string, public: boolean, name: string, description?: string | null | undefined, complementaryResources?: Array<{ __typename?: 'Resource', _id: string, name: string, type: Types.ResourceType, rating?: number | null | undefined, url: string, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined } | null | undefined }> | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, createdBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined, startedBy?: { __typename?: 'LearningPathStartedByResults', count: number, items: Array<{ __typename?: 'LearningPathStartedByItem', user: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } }> } | null | undefined, resourceItems?: Array<{ __typename?: 'LearningPathResourceItem', description?: string | null | undefined, resource: { __typename?: 'Resource', _id: string, durationSeconds?: number | null | undefined, name: string, type: Types.ResourceType, mediaType: Types.ResourceMediaType, url: string, description?: string | null | undefined, upvotes?: number | null | undefined, rating?: number | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, subResourceSeries?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined, subResources?: Array<{ __typename?: 'Resource', _id: string, name: string }> | null | undefined } }> | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };



/**
 * __useGetLearningPathPageQuery__
 *
 * To run a query within a React component, call `useGetLearningPathPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLearningPathPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLearningPathPageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetLearningPathPageQuery(baseOptions: Apollo.QueryHookOptions<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>(Operations.getLearningPathPage, options);
      }
export function useGetLearningPathPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>(Operations.getLearningPathPage, options);
        }
export type GetLearningPathPageQueryHookResult = ReturnType<typeof useGetLearningPathPageQuery>;
export type GetLearningPathPageLazyQueryHookResult = ReturnType<typeof useGetLearningPathPageLazyQuery>;
export type GetLearningPathPageQueryResult = Apollo.QueryResult<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>;