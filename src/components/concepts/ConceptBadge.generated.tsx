import * as Types from '../../graphql/types';

export type ConceptBadgeDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name'>
  & { domain?: Types.Maybe<(
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key' | 'name'>
  )>, known?: Types.Maybe<(
    { __typename?: 'KnownConcept' }
    & Pick<Types.KnownConcept, 'level'>
  )> }
);
