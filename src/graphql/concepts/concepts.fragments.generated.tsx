import * as Types from '../types';

export type ConceptLinkDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name'>
  & { domain?: Types.Maybe<(
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key' | 'name'>
  )> }
);

export type ConceptDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name' | 'types' | 'description'>
  & { known?: Types.Maybe<(
    { __typename?: 'KnownConcept' }
    & Pick<Types.KnownConcept, 'level'>
  )> }
);

export type ConceptWithDependenciesDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name' | 'types'>
  & { known?: Types.Maybe<(
    { __typename?: 'KnownConcept' }
    & Pick<Types.KnownConcept, 'level'>
  )>, referencedByConcepts?: Types.Maybe<Array<(
    { __typename?: 'ConceptReferencesConceptItem' }
    & { concept: (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id'>
    ) }
  )>> }
);
