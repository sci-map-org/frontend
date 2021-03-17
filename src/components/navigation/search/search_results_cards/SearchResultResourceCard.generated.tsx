import * as Types from '../../../../graphql/types';

import { ResourceLinkDataFragment } from '../../../../graphql/resources/resources.fragments.generated';
export type SearchResultResourceCardDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, 'rating'>
  & { resourceType: Types.Resource['type'] }
  & ResourceLinkDataFragment
);
