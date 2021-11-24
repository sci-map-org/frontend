import * as Types from '../../graphql/types';

import { ResourcePreviewCardDataFragment } from '../resources/ResourcePreviewCard.generated';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
import * as Operations from './TopicRecommendedLearningMaterials';
import * as Apollo from '@apollo/client';
export type GetDomainRecommendedLearningMaterialsQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.TopicLearningMaterialsOptions;
}>;


export type GetDomainRecommendedLearningMaterialsQuery = (
  { __typename?: 'Query' }
  & { getTopicByKey: (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, '_id'>
    & { learningMaterials?: Types.Maybe<(
      { __typename?: 'TopicLearningMaterialsResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewCardDataFragment
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