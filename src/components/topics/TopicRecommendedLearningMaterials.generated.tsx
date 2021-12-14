import * as Types from '../../graphql/types';

import { ResourcePreviewCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
import * as Operations from './TopicRecommendedLearningMaterials';
import * as Apollo from '@apollo/client';
export type GetTopicRecommendedLearningMaterialsQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  learningMaterialsOptions: Types.TopicLearningMaterialsOptions;
}>;


export type GetTopicRecommendedLearningMaterialsQuery = (
  { __typename?: 'Query' }
  & { getTopicByKey: (
    { __typename?: 'Topic' }
    & Pick<Types.Topic, '_id'>
    & { learningMaterials?: Types.Maybe<(
      { __typename?: 'TopicLearningMaterialsResults' }
      & { items: Array<(
        { __typename?: 'LearningPath' }
        & LearningPathPreviewCardDataFragment
      ) | (
        { __typename?: 'Resource' }
        & ResourcePreviewCardDataFragment
      )> }
    )> }
  ) }
);



/**
 * __useGetTopicRecommendedLearningMaterialsQuery__
 *
 * To run a query within a React component, call `useGetTopicRecommendedLearningMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicRecommendedLearningMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicRecommendedLearningMaterialsQuery({
 *   variables: {
 *      key: // value for 'key'
 *      learningMaterialsOptions: // value for 'learningMaterialsOptions'
 *   },
 * });
 */
export function useGetTopicRecommendedLearningMaterialsQuery(baseOptions: Apollo.QueryHookOptions<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>) {
        return Apollo.useQuery<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>(Operations.getTopicRecommendedLearningMaterials, baseOptions);
      }
export function useGetTopicRecommendedLearningMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>(Operations.getTopicRecommendedLearningMaterials, baseOptions);
        }
export type GetTopicRecommendedLearningMaterialsQueryHookResult = ReturnType<typeof useGetTopicRecommendedLearningMaterialsQuery>;
export type GetTopicRecommendedLearningMaterialsLazyQueryHookResult = ReturnType<typeof useGetTopicRecommendedLearningMaterialsLazyQuery>;
export type GetTopicRecommendedLearningMaterialsQueryResult = Apollo.QueryResult<GetTopicRecommendedLearningMaterialsQuery, GetTopicRecommendedLearningMaterialsQueryVariables>;