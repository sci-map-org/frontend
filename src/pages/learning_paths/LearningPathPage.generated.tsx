import * as Types from '../../graphql/types';

import { LearningPathWithResourceItemsPreviewDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import * as Operations from './LearningPathPage';
import * as Apollo from '@apollo/client';
export type GetLearningPathPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetLearningPathPageQuery = (
  { __typename?: 'Query' }
  & { getLearningPathByKey: (
    { __typename?: 'LearningPath' }
    & LearningPathWithResourceItemsPreviewDataFragment
  ) }
);



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
export function useGetLearningPathPageQuery(baseOptions?: Apollo.QueryHookOptions<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>) {
        return Apollo.useQuery<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>(Operations.getLearningPathPage, baseOptions);
      }
export function useGetLearningPathPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>) {
          return Apollo.useLazyQuery<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>(Operations.getLearningPathPage, baseOptions);
        }
export type GetLearningPathPageQueryHookResult = ReturnType<typeof useGetLearningPathPageQuery>;
export type GetLearningPathPageLazyQueryHookResult = ReturnType<typeof useGetLearningPathPageLazyQuery>;
export type GetLearningPathPageQueryResult = Apollo.QueryResult<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>;