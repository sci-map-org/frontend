import * as Types from '../types';

import { ConceptDataFragment } from '../concepts/concepts.fragments.generated';


export type DomainDataFragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, '_id' | 'name' | 'key' | 'description'>
);

export type DomainWithConceptsDataFragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, '_id' | 'name' | 'key' | 'description'>
  & { concepts: Types.Maybe<(
    { __typename?: 'DomainConceptsResults' }
    & { items: Array<(
      { __typename?: 'Concept' }
      & ConceptDataFragment
    )> }
  )> }
);

