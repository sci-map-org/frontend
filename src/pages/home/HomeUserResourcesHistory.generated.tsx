import * as Types from '../../graphql/types';

export type LastOpenedResourceCardDataFragment = (
  { __typename?: 'UserConsumedResourceItem' }
  & Pick<Types.UserConsumedResourceItem, 'consumedAt' | 'openedAt'>
  & { resource: (
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name' | 'url' | 'type' | 'rating' | 'durationSeconds'>
  ) }
);
