import * as Types from '../../graphql/types';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
import * as Operations from './DomainRecommendedLearningMaterials';
import * as Apollo from '@apollo/client';
export type GetDomainRecommendedLearningMaterialsQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.DomainLearningMaterialsOptions;
}>;


export type GetDomainRecommendedLearningMaterialsQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & { learningMaterials?: Types.Maybe<(
      { __typename?: 'DomainLearningMaterialsResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      ) | (
        { __typename?: 'LearningPath' }
        & LearningPathPreviewCardDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useGetDomainRecommendedLearningMaterialsQuery__
 *
 * To run a query within a React component, call `useGetDomainRecommendedLearningMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainRecommendedLearningMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainRecommendedLearningMaterialsQuery({
 *   variables: {
 *      key: // value for 'key'
 *      learningMaterialsOptions: // value for 'learningMaterialsOptions'
 *   },
 * });
 */
export function useGetDomainRecommendedLearningMaterialsQuery(baseOptions: Apollo.QueryHookOptions<GetDomainRecommendedLearningMaterialsQuery, GetDomainRecommendedLearningMaterialsQueryVariables>) {
        return Apollo.useQuery<GetDomainRecommendedLearningMaterialsQuery, GetDomainRecommendedLearningMaterialsQueryVariables>(Operations.getDomainRecommendedLearningMaterials, baseOptions);
      }
export function useGetDomainRecommendedLearningMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainRecommendedLearningMaterialsQuery, GetDomainRecommendedLearningMaterialsQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainRecommendedLearningMaterialsQuery, GetDomainRecommendedLearningMaterialsQueryVariables>(Operations.getDomainRecommendedLearningMaterials, baseOptions);
        }
export type GetDomainRecommendedLearningMaterialsQueryHookResult = ReturnType<typeof useGetDomainRecommendedLearningMaterialsQuery>;
export type GetDomainRecommendedLearningMaterialsLazyQueryHookResult = ReturnType<typeof useGetDomainRecommendedLearningMaterialsLazyQuery>;
export type GetDomainRecommendedLearningMaterialsQueryResult = Apollo.QueryResult<GetDomainRecommendedLearningMaterialsQuery, GetDomainRecommendedLearningMaterialsQueryVariables>;