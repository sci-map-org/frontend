import * as Types from '../../graphql/types';

import { LearningPathPreviewCardDataFragment } from './LearningPathPreviewCard.generated';
import * as Operations from './DomainLearningPaths';
import * as Apollo from '@apollo/client';
export type GetDomainLearningPathsQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
}>;


export type GetDomainLearningPathsQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & { learningPaths?: Types.Maybe<(
      { __typename?: 'DomainLearningPathsResults' }
      & { items: Array<(
        { __typename?: 'LearningPath' }
        & LearningPathPreviewCardDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useGetDomainLearningPathsQuery__
 *
 * To run a query within a React component, call `useGetDomainLearningPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainLearningPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainLearningPathsQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *   },
 * });
 */
export function useGetDomainLearningPathsQuery(baseOptions: Apollo.QueryHookOptions<GetDomainLearningPathsQuery, GetDomainLearningPathsQueryVariables>) {
        return Apollo.useQuery<GetDomainLearningPathsQuery, GetDomainLearningPathsQueryVariables>(Operations.getDomainLearningPaths, baseOptions);
      }
export function useGetDomainLearningPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainLearningPathsQuery, GetDomainLearningPathsQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainLearningPathsQuery, GetDomainLearningPathsQueryVariables>(Operations.getDomainLearningPaths, baseOptions);
        }
export type GetDomainLearningPathsQueryHookResult = ReturnType<typeof useGetDomainLearningPathsQuery>;
export type GetDomainLearningPathsLazyQueryHookResult = ReturnType<typeof useGetDomainLearningPathsLazyQuery>;
export type GetDomainLearningPathsQueryResult = Apollo.QueryResult<GetDomainLearningPathsQuery, GetDomainLearningPathsQueryVariables>;