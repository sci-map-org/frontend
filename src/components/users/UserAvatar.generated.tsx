import * as Types from '../../graphql/types';

export type UserAvatarDataFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, '_id' | 'key' | 'displayName'>
);
