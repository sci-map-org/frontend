import * as Types from '../types';

import { ConceptDataFragment } from '../concepts/concepts.fragments.generated';

export type ResourceDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationMn'>
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
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationMn' | 'upvotes'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'ResourceTag' }
    & Pick<Types.ResourceTag, 'name'>
  )>>, consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
  )>, coveredConcepts?: Types.Maybe<(
    { __typename?: 'ResourceCoveredConceptsResults' }
    & { items: Array<(
      { __typename?: 'Concept' }
      & ConceptDataFragment
    )> }
  )> }
);

