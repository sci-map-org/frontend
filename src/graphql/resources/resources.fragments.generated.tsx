import * as Types from '../types';

import { DomainDataFragment } from '../domains/domains.fragments.generated';
import { ConceptDataFragment } from '../concepts/concepts.fragments.generated';
export type ResourceDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationMs' | 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'ResourceTag' }
    & Pick<Types.ResourceTag, 'name'>
  )>>, consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
  )> }
);

export type ResourcePreviewDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationMs' | 'upvotes' | 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'ResourceTag' }
    & Pick<Types.ResourceTag, 'name'>
  )>>, consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
  )>, coveredConceptsByDomain?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainDataFragment
    ), coveredConcepts: Array<(
      { __typename?: 'Concept' }
      & ConceptDataFragment
    )> }
  )>>, subResourceSeries?: Types.Maybe<Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name'>
  )>>, subResources?: Types.Maybe<Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name'>
  )>> }
);

export type ResourceWithCoveredConceptsByDomainDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { coveredConceptsByDomain?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainDataFragment
    ), coveredConcepts: Array<(
      { __typename?: 'Concept' }
      & ConceptDataFragment
    )> }
  )>> }
);
