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
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { routerPushToPage } from '../../pages/PageInfo';
import { UserProfilePageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';
import { UserAvatarDataFragment } from './UserAvatar.generated';

export const UserAvatarData = gql`
  fragment UserAvatarData on User {
    _id
    key
    displayName
    profilePictureUrl
  }
`;

export const UserAvatar: React.FC<
  { user: UserAvatarDataFragment | CurrentUserDataFragment; disablePopover?: boolean } & AvatarProps
> = ({ user, disablePopover, ...avatarProps }) => {
  const avatar = (
    <Avatar
      name={user.displayName}
      {...avatarProps}
      {...(!disablePopover && { _hover: { cursor: 'pointer' } })}
      {...(!!user.profilePictureUrl && { src: user.profilePictureUrl })}
      onClick={() => routerPushToPage(UserProfilePageInfo(user))}
    />
  );

  return disablePopover ? (
    avatar
  ) : (
    <Popover isLazy trigger="hover">
      <PopoverTrigger>{avatar}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Flex direction="row" alignItems="center">
            <Center px={1} mr={3}>
              <Avatar
                name={user.displayName}
                size="sm"
                {...(!!user.profilePictureUrl && { src: user.profilePictureUrl })}
              />
            </Center>
            <Stack spacing={0}>
              <PageLink pageInfo={UserProfilePageInfo(user)} fontSize="lg" fontWeight={500}>
                {user.displayName}
              </PageLink>
              <Text fontWeight={600} color="gray.500" fontSize="md">
                @{user.key}
              </Text>
            </Stack>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
