import * as Types from '../../graphql/types';

import { ResourceDataFragment, ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { UserAvatarDataFragment } from '../../components/users/UserAvatar.generated';
import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { SquareResourceCardDataFragment } from '../../components/resources/SquareResourceCard.generated';
import { EditableLearningMaterialOutcomesData_Resource_Fragment, EditableLearningMaterialOutcomesData_LearningPath_Fragment } from '../../components/learning_materials/EditableLearningMaterialOutcomes.generated';
import { EditableLearningMaterialPrerequisitesData_Resource_Fragment, EditableLearningMaterialPrerequisitesData_LearningPath_Fragment } from '../../components/learning_materials/EditableLearningMaterialPrerequisites.generated';
import { LearningMaterialStarsRaterData_Resource_Fragment, LearningMaterialStarsRaterData_LearningPath_Fragment } from '../../components/learning_materials/LearningMaterialStarsRating.generated';
import * as Operations from './ResourcePage';
import * as Apollo from '@apollo/client';
export type GetResourceResourcePageQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetResourceResourcePageQuery = (
  { __typename?: 'Query' }
  & { getResourceById: (
    { __typename?: 'Resource' }
    & { creator?: Types.Maybe<(
      { __typename?: 'User' }
      & UserAvatarDataFragment
    )>, coveredConceptsByDomain?: Types.Maybe<Array<(
      { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
      & { domain: (
        { __typename?: 'Domain' }
        & DomainDataFragment
      ), coveredConcepts: Array<(
        { __typename?: 'Concept' }
        & ConceptDataFragment
      )> }
    )>>, subResources?: Types.Maybe<Array<(
      { __typename?: 'Resource' }
      & SquareResourceCardDataFragment
    )>>, subResourceSeries?: Types.Maybe<Array<(
      { __typename?: 'Resource' }
      & ResourceDataFragment
    )>>, parentResources?: Types.Maybe<Array<(
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id' | 'name'>
    )>>, seriesParentResource?: Types.Maybe<(
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id' | 'name'>
    )>, previousResource?: Types.Maybe<(
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id' | 'name'>
    )>, nextResource?: Types.Maybe<(
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id' | 'name'>
    )> }
    & ResourceDataFragment
    & EditableLearningMaterialOutcomesData_Resource_Fragment
    & EditableLearningMaterialPrerequisitesData_Resource_Fragment
    & LearningMaterialStarsRaterData_Resource_Fragment
  ) }
);



/**
 * __useGetResourceResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceResourcePageQuery(baseOptions: Apollo.QueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>) {
        return Apollo.useQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(Operations.getResourceResourcePage, baseOptions);
      }
export function useGetResourceResourcePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>) {
          return Apollo.useLazyQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(Operations.getResourceResourcePage, baseOptions);
        }
export type GetResourceResourcePageQueryHookResult = ReturnType<typeof useGetResourceResourcePageQuery>;
export type GetResourceResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceResourcePageLazyQuery>;
export type GetResourceResourcePageQueryResult = Apollo.QueryResult<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>;