import {
  Avatar,
  Box,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { reverse } from 'lodash';
import { UserDisplayName } from '../lib/Typography';
import { UserAvatar } from './UserAvatar';
import { UserAvatarDataFragment } from './UserAvatar.generated';
import { UserKeyLink } from './UserKeyLink';

interface UserAvatarGroupProps {
  users: UserAvatarDataFragment[];
  popoverTitle: string;
  size?: 'sm' | 'md';
}
const sizesMapping = {
  sm: {
    avatarSize: 'sm',
  },
  md: {
    avatarSize: 'sm',
  },
};
export const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({ users, popoverTitle, size = 'md' }) => {
  return (
    <Stack direction="row" alignItems="center" spacing="4px">
      <Stack direction="row-reverse" spacing={-3}>
        {/* _.reverse in order to have them stack in the right order  */}
        {reverse(users.slice(0, 3)).map((user) => (
          <UserAvatar key={user._id} user={user} size={sizesMapping[size].avatarSize} showBorder />
        ))}
      </Stack>
      {users.length > 3 && (
        <>
          <Stack direction="row" spacing="4px" alignItems="center">
            <Box borderRadius={12} boxSize="4px" backgroundColor="gray.700" />
            <Box borderRadius={12} boxSize="4px" backgroundColor="gray.700" />
          </Stack>
          <Popover trigger="hover" isLazy>
            <PopoverTrigger>
              <Avatar
                name="test"
                backgroundColor="gray.400"
                getInitials={() => `+${users.length - 3}`}
                size={sizesMapping[size].avatarSize}
                _hover={{ cursor: 'pointer' }}
                showBorder
              />
            </PopoverTrigger>
            <PopoverContent w="auto">
              <PopoverArrow />
              <PopoverHeader bgColor="teal.600" color="white" fontWeight={600}>
                {popoverTitle}
              </PopoverHeader>
              <PopoverBody maxH="240px" overflowY="scroll" maxW="100%" bgColor="white">
                <Stack>
                  {users.map((user) => (
                    <Flex key={user._id} direction="row" maxW="100%">
                      <Center flexShrink={0} mr={2}>
                        <UserAvatar user={user} size="sm" disablePopover />
                      </Center>
                      <Flex alignItems="center">
                        <Stack pl={2} direction="row" spacing="4px" alignItems="baseline">
                          <UserDisplayName>{user.displayName}</UserDisplayName>
                          <UserKeyLink user={user} flexShrink={1} />
                        </Stack>
                      </Flex>
                    </Flex>
                  ))}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      )}
    </Stack>
  );
};
