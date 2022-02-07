import {
  Avatar,
  AvatarProps,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { forwardRef } from 'react';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { routerPushToPage } from '../../pages/PageInfo';
import { UserProfilePageInfo } from '../../pages/RoutesPageInfos';
import { UserDisplayName } from '../lib/Typography';
import { PageLink } from '../navigation/InternalLink';
import { UserAvatarDataFragment } from './UserAvatar.generated';
import { UserKeyLink } from './UserKeyLink';

export const UserAvatarData = gql`
  fragment UserAvatarData on User {
    _id
    key
    displayName
    profilePictureUrl
  }
`;

export const UserAvatar: React.FC<
  {
    user: UserAvatarDataFragment | CurrentUserDataFragment;
    disablePopover?: boolean;
    isLoading?: boolean;
  } & AvatarProps
> = ({ user, disablePopover, isLoading, ...avatarProps }) => {
  return disablePopover ? (
    <UserAvatarPicture user={user} isLoading={isLoading} {...avatarProps} />
  ) : (
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <UserAvatarPicture user={user} isLoading={isLoading} {...avatarProps} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Flex direction="row" alignItems="center">
            <Center px={1} mr={3}>
              <UserAvatarPicture user={user} isLoading={isLoading} size="sm" />
            </Center>
            <Stack spacing={0}>
              <UserDisplayName>{user.displayName}</UserDisplayName>
              <UserKeyLink user={user}>@{user.key}</UserKeyLink>
            </Stack>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const UserAvatarPicture = forwardRef<
  HTMLSpanElement,
  {
    user: UserAvatarDataFragment | CurrentUserDataFragment;
    isLoading?: boolean;
  } & Omit<AvatarProps, 'name'>
>(({ user, isLoading, ...avatarProps }, ref) => {
  return (
    <Avatar
      ref={ref}
      {...(!isLoading && { name: user.displayName })}
      {...avatarProps}
      {...(!!user.profilePictureUrl && { src: user.profilePictureUrl })}
      onClick={() => routerPushToPage(UserProfilePageInfo(user))}
      color="white"
    />
  );
});
