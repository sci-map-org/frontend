import * as Types from '../../../graphql/types';

import * as Operations from './LearningMaterialTagSelector';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchLearningMaterialTagsQueryVariables = Types.Exact<{
  options: Types.SearchLearningMaterialTagsOptions;
}>;


export type SearchLearningMaterialTagsQuery = { __typename?: 'Query', searchLearningMaterialTags: Array<{ __typename?: 'LearningMaterialTagSearchResult', name: string, usageCount?: number | null | undefined }> };



/**
 * __useSearchLearningMaterialTagsQuery__
 *
 * To run a query within a React component, call `useSearchLearningMaterialTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLearningMaterialTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLearningMaterialTagsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchLearningMaterialTagsQuery(baseOptions: Apollo.QueryHookOptions<SearchLearningMaterialTagsQuery, SearchLearningMaterialTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchLearningMaterialTagsQuery, SearchLearningMaterialTagsQueryVariables>(Operations.searchLearningMaterialTags, options);
      }
export function useSearchLearningMaterialTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLearningMaterialTagsQuery, SearchLearningMaterialTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchLearningMaterialTagsQuery, SearchLearningMaterialTagsQueryVariables>(Operations.searchLearningMaterialTags, options);
        }
export type SearchLearningMaterialTagsQueryHookResult = ReturnType<typeof useSearchLearningMaterialTagsQuery>;
export type SearchLearningMaterialTagsLazyQueryHookResult = ReturnType<typeof useSearchLearningMaterialTagsLazyQuery>;
export type SearchLearningMaterialTagsQueryResult = Apollo.QueryResult<SearchLearningMaterialTagsQuery, SearchLearningMaterialTagsQueryVariables>;