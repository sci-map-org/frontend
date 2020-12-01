import * as Types from '../../graphql/types';

export type ResourceMiniCardDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'url' | 'rating'>
);
