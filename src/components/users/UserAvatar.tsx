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
import { UserProfilePageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';
import { UserAvatarDataFragment } from './UserAvatar.generated';

export const UserAvatarData = gql`
  fragment UserAvatarData on User {
    _id
    key
    displayName
  }
`;

export const UserAvatar: React.FC<{ user: UserAvatarDataFragment } & AvatarProps> = ({ user, ...avatarProps }) => {
  return (
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Avatar name={user.displayName} {...avatarProps} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Flex direction="row" alignItems="center">
            <Center px={1} mr={3}>
              <Avatar name={user.displayName} size="sm" />
            </Center>
            <Stack spacing={1}>
              <PageLink pageInfo={UserProfilePageInfo(user)} fontSize="lg" fontWeight={500}>
                {user.displayName}
              </PageLink>
              <Text fontWeight={600} color="gray.600" fontSize="md">
                @{user.key}
              </Text>
            </Stack>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
