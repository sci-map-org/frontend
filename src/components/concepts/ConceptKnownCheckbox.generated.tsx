import * as Types from '../../graphql/types';

export type ConceptKnownCheckboxDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id'>
  & { known?: Types.Maybe<(
    { __typename?: 'KnownConcept' }
    & Pick<Types.KnownConcept, 'level'>
  )> }
);
