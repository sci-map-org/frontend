import * as Types from '../../../graphql/types';

import * as Operations from './PrerequisiteMap';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetPrerequisiteMapTopicsQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type GetPrerequisiteMapTopicsQuery = { __typename?: 'Query', getTopicById: { __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, prerequisites?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', prerequisiteTopic: { __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined, followUps?: Array<{ __typename?: 'TopicHasPrerequisiteTopic', followUpTopic: { __typename?: 'Topic', subTopicsTotalCount?: number | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined } }> | null | undefined } };



/**
 * __useGetPrerequisiteMapTopicsQuery__
 *
 * To run a query within a React component, call `useGetPrerequisiteMapTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrerequisiteMapTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrerequisiteMapTopicsQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetPrerequisiteMapTopicsQuery(baseOptions: Apollo.QueryHookOptions<GetPrerequisiteMapTopicsQuery, GetPrerequisiteMapTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrerequisiteMapTopicsQuery, GetPrerequisiteMapTopicsQueryVariables>(Operations.getPrerequisiteMapTopics, options);
      }
export function useGetPrerequisiteMapTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrerequisiteMapTopicsQuery, GetPrerequisiteMapTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrerequisiteMapTopicsQuery, GetPrerequisiteMapTopicsQueryVariables>(Operations.getPrerequisiteMapTopics, options);
        }
export type GetPrerequisiteMapTopicsQueryHookResult = ReturnType<typeof useGetPrerequisiteMapTopicsQuery>;
export type GetPrerequisiteMapTopicsLazyQueryHookResult = ReturnType<typeof useGetPrerequisiteMapTopicsLazyQuery>;
export type GetPrerequisiteMapTopicsQueryResult = Apollo.QueryResult<GetPrerequisiteMapTopicsQuery, GetPrerequisiteMapTopicsQueryVariables>;