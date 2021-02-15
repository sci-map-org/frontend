import * as Types from '../../graphql/types';

import { UserAvatarDataFragment } from '../users/UserAvatar.generated';
export type OtherLearnersViewerUserDataFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, '_id'>
  & UserAvatarDataFragment
);
