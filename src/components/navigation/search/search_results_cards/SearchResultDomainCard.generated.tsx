import * as Types from '../../../../graphql/types';

import { DomainLinkDataFragment, DomainDataFragment } from '../../../../graphql/domains/domains.fragments.generated';
export type SearchResultDomainCardDataFragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, 'conceptTotalCount' | 'learningMaterialsTotalCount'>
  & DomainLinkDataFragment
);
