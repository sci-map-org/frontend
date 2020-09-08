import * as Types from '../types';

export type CurrentUserDataFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<Types.CurrentUser, '_id' | 'email' | 'key' | 'role' | 'displayName'>
);

export type PublicUserDataFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, '_id' | 'key' | 'role' | 'displayName'>
);
