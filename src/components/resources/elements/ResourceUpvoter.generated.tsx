import * as Types from '../../../graphql/types';

export type ResourceUpvoterDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'upvotes'>
);
