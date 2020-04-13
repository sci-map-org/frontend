import * as Types from '../types';


export type ConceptDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name' | 'description'>
  & { known?: Types.Maybe<(
    { __typename?: 'KnownConcept' }
    & Pick<Types.KnownConcept, 'level'>
  )> }
);

