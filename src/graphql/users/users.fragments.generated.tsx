import * as Types from '../types';


export type CurrentUserDataFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<Types.CurrentUser, '_id' | 'email' | 'key' | 'role'>
);

