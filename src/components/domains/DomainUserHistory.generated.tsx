import * as Types from '../../graphql/types';

import { ResourceMiniCardDataFragment } from '../resources/ResourceMiniCard.generated';
import { LearningPathMiniCardDataFragment } from '../learning_paths/LearningPathMiniCard.generated';
import * as Operations from './DomainUserHistory';
import * as Apollo from '@apollo/client';
export type GetDomainCompletedLearningMaterialsHistoryQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.DomainLearningMaterialsOptions;
}>;


export type GetDomainCompletedLearningMaterialsHistoryQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & { learningMaterials?: Types.Maybe<(
      { __typename?: 'DomainLearningMaterialsResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourceMiniCardDataFragment
      ) | (
        { __typename?: 'LearningPath' }
        & LearningPathMiniCardDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useGetDomainCompletedLearningMaterialsHistoryQuery__
 *
 * To run a query within a React component, call `useGetDomainCompletedLearningMaterialsHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainCompletedLearningMaterialsHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainCompletedLearningMaterialsHistoryQuery({
 *   variables: {
 *      key: // value for 'key'
 *      learningMaterialsOptions: // value for 'learningMaterialsOptions'
 *   },
 * });
 */
export function useGetDomainCompletedLearningMaterialsHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetDomainCompletedLearningMaterialsHistoryQuery, GetDomainCompletedLearningMaterialsHistoryQueryVariables>) {
        return Apollo.useQuery<GetDomainCompletedLearningMaterialsHistoryQuery, GetDomainCompletedLearningMaterialsHistoryQueryVariables>(Operations.getDomainCompletedLearningMaterialsHistory, baseOptions);
      }
export function useGetDomainCompletedLearningMaterialsHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainCompletedLearningMaterialsHistoryQuery, GetDomainCompletedLearningMaterialsHistoryQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainCompletedLearningMaterialsHistoryQuery, GetDomainCompletedLearningMaterialsHistoryQueryVariables>(Operations.getDomainCompletedLearningMaterialsHistory, baseOptions);
        }
export type GetDomainCompletedLearningMaterialsHistoryQueryHookResult = ReturnType<typeof useGetDomainCompletedLearningMaterialsHistoryQuery>;
export type GetDomainCompletedLearningMaterialsHistoryLazyQueryHookResult = ReturnType<typeof useGetDomainCompletedLearningMaterialsHistoryLazyQuery>;
export type GetDomainCompletedLearningMaterialsHistoryQueryResult = Apollo.QueryResult<GetDomainCompletedLearningMaterialsHistoryQuery, GetDomainCompletedLearningMaterialsHistoryQueryVariables>;