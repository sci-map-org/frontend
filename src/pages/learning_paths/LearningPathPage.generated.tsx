import * as Types from '../../graphql/types';

import { LearningPathWithResourceItemsPreviewDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { SquareResourceCardDataFragment } from '../../components/resources/SquareResourceCard.generated';
import { UserAvatarDataFragment } from '../../components/users/UserAvatar.generated';
import { LearningPathCompletionDataFragment } from '../../components/learning_paths/LearningPathCompletion.generated';
import { LearningMaterialWithCoveredConceptsByDomainData_Resource_Fragment, LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { EditableLearningMaterialPrerequisitesData_Resource_Fragment, EditableLearningMaterialPrerequisitesData_LearningPath_Fragment } from '../../components/learning_materials/EditableLearningMaterialPrerequisites.generated';
import { EditableLearningMaterialOutcomesData_Resource_Fragment, EditableLearningMaterialOutcomesData_LearningPath_Fragment } from '../../components/learning_materials/EditableLearningMaterialOutcomes.generated';
import { LearningMaterialStarsRaterData_Resource_Fragment, LearningMaterialStarsRaterData_LearningPath_Fragment } from '../../components/learning_materials/LearningMaterialStarsRating.generated';
import * as Operations from './LearningPathPage';
import * as Apollo from '@apollo/client';
export type GetLearningPathPageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetLearningPathPageQuery = (
  { __typename?: 'Query' }
  & { getLearningPathByKey: (
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, 'rating'>
    & { complementaryResources?: Types.Maybe<Array<(
      { __typename?: 'Resource' }
      & SquareResourceCardDataFragment
    )>>, tags?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialTag' }
      & Pick<Types.LearningMaterialTag, 'name'>
    )>>, createdBy?: Types.Maybe<(
      { __typename?: 'User' }
      & UserAvatarDataFragment
    )>, startedBy?: Types.Maybe<(
      { __typename?: 'LearningPathStartedByResults' }
      & Pick<Types.LearningPathStartedByResults, 'count'>
      & { items: Array<(
        { __typename?: 'LearningPathStartedByItem' }
        & { user: (
          { __typename?: 'User' }
          & UserAvatarDataFragment
        ) }
      )> }
    )> }
    & LearningPathWithResourceItemsPreviewDataFragment
    & LearningPathCompletionDataFragment
    & LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment
    & EditableLearningMaterialPrerequisitesData_LearningPath_Fragment
    & EditableLearningMaterialOutcomesData_LearningPath_Fragment
    & LearningMaterialStarsRaterData_LearningPath_Fragment
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
export function useGetLearningPathPageQuery(baseOptions: Apollo.QueryHookOptions<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>) {
        return Apollo.useQuery<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>(Operations.getLearningPathPage, baseOptions);
      }
export function useGetLearningPathPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>) {
          return Apollo.useLazyQuery<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>(Operations.getLearningPathPage, baseOptions);
        }
export type GetLearningPathPageQueryHookResult = ReturnType<typeof useGetLearningPathPageQuery>;
export type GetLearningPathPageLazyQueryHookResult = ReturnType<typeof useGetLearningPathPageLazyQuery>;
export type GetLearningPathPageQueryResult = Apollo.QueryResult<GetLearningPathPageQuery, GetLearningPathPageQueryVariables>;