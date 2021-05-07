import * as Types from '../../graphql/types';

import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
export type EditConceptDataFragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'name' | 'types' | 'description'>
  & { domain?: Types.Maybe<(
    { __typename?: 'Domain' }
    & DomainDataFragment
  )> }
);
