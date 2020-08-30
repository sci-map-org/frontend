import * as Types from '../types';


export type ConceptDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name' | 'description'>
  & { known?: Types.Maybe<(
    { __typename?: 'KnownConcept' }
    & Pick<Types.KnownConcept, 'level'>
  )> }
);

export type ConceptWithDependenciesDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name'>
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

