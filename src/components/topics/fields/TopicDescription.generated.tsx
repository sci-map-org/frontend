import * as Types from '../../../graphql/types';

import * as Operations from './TopicDescription';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PullTopicDescriptionsQueryVariables = Types.Exact<{
  queryOptions: Types.PullDescriptionsQueryOptions;
}>;


export type PullTopicDescriptionsQuery = { __typename?: 'Query', pullTopicDescriptions: Array<{ __typename?: 'PulledDescription', sourceUrl: string, sourceName: Types.PulledDescriptionSourceName, resultName?: string | null | undefined, description: string }> };



/**
 * __usePullTopicDescriptionsQuery__
 *
 * To run a query within a React component, call `usePullTopicDescriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePullTopicDescriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePullTopicDescriptionsQuery({
 *   variables: {
 *      queryOptions: // value for 'queryOptions'
 *   },
 * });
 */
export function usePullTopicDescriptionsQuery(baseOptions: Apollo.QueryHookOptions<PullTopicDescriptionsQuery, PullTopicDescriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PullTopicDescriptionsQuery, PullTopicDescriptionsQueryVariables>(Operations.pullTopicDescriptions, options);
      }
export function usePullTopicDescriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PullTopicDescriptionsQuery, PullTopicDescriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PullTopicDescriptionsQuery, PullTopicDescriptionsQueryVariables>(Operations.pullTopicDescriptions, options);
        }
export type PullTopicDescriptionsQueryHookResult = ReturnType<typeof usePullTopicDescriptionsQuery>;
export type PullTopicDescriptionsLazyQueryHookResult = ReturnType<typeof usePullTopicDescriptionsLazyQuery>;
export type PullTopicDescriptionsQueryResult = Apollo.QueryResult<PullTopicDescriptionsQuery, PullTopicDescriptionsQueryVariables>;