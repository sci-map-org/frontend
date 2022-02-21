import * as Types from '../../graphql/types';

import * as Operations from './EditResourcePage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetResourceEditResourcePageQueryVariables = Types.Exact<{
  resourceKey: Types.Scalars['String'];
}>;


export type GetResourceEditResourcePageQuery = { __typename?: 'Query', getResourceByKey: { __typename?: 'Resource', _id: string, key: string, name: string, types: Array<Types.ResourceType>, url: string, description?: string | null | undefined, durationSeconds?: number | null | undefined, rating?: number | null | undefined, createdBy?: { __typename?: 'User', _id: string } | null | undefined, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined, prerequisites?: Array<{ __typename?: 'LearningMaterialHasPrerequisiteTopic', topic: { __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined, tags?: Array<{ __typename?: 'LearningMaterialTag', name: string }> | null | undefined, consumed?: { __typename?: 'ConsumedResource', openedAt?: any | null | undefined, consumedAt?: any | null | undefined } | null | undefined } };



/**
 * __useGetResourceEditResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceEditResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceEditResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceEditResourcePageQuery({
 *   variables: {
 *      resourceKey: // value for 'resourceKey'
 *   },
 * });
 */
export function useGetResourceEditResourcePageQuery(baseOptions: Apollo.QueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, options);
      }
export function useGetResourceEditResourcePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>(Operations.getResourceEditResourcePage, options);
        }
export type GetResourceEditResourcePageQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageQuery>;
export type GetResourceEditResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceEditResourcePageLazyQuery>;
export type GetResourceEditResourcePageQueryResult = Apollo.QueryResult<GetResourceEditResourcePageQuery, GetResourceEditResourcePageQueryVariables>;