import * as Types from '../types';

import { ConceptDataFragment } from '../concepts/concepts.fragments.generated';


export type ResourceDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description'>
);

export type ResourcePreviewDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description'>
  & { tags: Types.Maybe<Array<(
    { __typename?: 'ResourceTag' }
    & Pick<Types.ResourceTag, 'name'>
  )>>, coveredConcepts: Types.Maybe<(
    { __typename?: 'ResourceCoveredConceptsResults' }
    & { items: Array<(
      { __typename?: 'Concept' }
      & ConceptDataFragment
    )> }
  )> }
);

