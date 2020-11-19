import * as Types from '../../graphql/types';

export type SquareResourceCardDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'rating'>
);
