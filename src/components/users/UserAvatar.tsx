import { Avatar, AvatarProps } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { UserAvatarDataFragment } from './UserAvatar.generated';

export const UserAvatarData = gql`
  fragment UserAvatarData on User {
    _id
    key
    displayName
  }
`;

// TODO: go to user's profile. Need some data there first though
export const UserAvatar: React.FC<{ user: UserAvatarDataFragment } & AvatarProps> = ({ user, ...avatarProps }) => {
  return <Avatar name={user.displayName} {...avatarProps} />;
};
