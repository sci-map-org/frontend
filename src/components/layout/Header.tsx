import { Box, Link, Menu, MenuButton, MenuItem, MenuList, Avatar, AvatarBadge, Text, Stack } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useCurrentUser, useLogout } from '../../graphql/users/users.hooks';
import { RoleAccess } from '../auth/RoleAccess';
import { InternalLink } from '../navigation/InternalLink';

export const Header: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { logout } = useLogout();

  return (
    <Box py={2} bg="gray.200" pl={2} fontSize="lg" display="flex" flexDirection="row">
      <InternalLink routePath="/" asHref="/">
        Apollo Project
      </InternalLink>
      <Box flexGrow={1} />
      <Stack direction="row" spacing={2} pr={2}>
        <InternalLink routePath="/domains" asHref="/domains">
          Domains
        </InternalLink>
        <InternalLink routePath="/about/[key]" asHref="/about/intro">
          About
        </InternalLink>
        {!!currentUser ? (
          <Menu>
            <MenuButton>
              {currentUser.key}
              {/* <Avatar size="xs" ml={2}>
                <AvatarBadge bg="green.500" size="0.7rem" />
              </Avatar> */}
            </MenuButton>
            <MenuList placement="bottom-end" bg="white">
              <NextLink href="/profile/[key]" as={`/profile/${currentUser.key}`} passHref>
                <MenuItem>
                  <Link>Profile</Link>
                </MenuItem>
              </NextLink>
              <RoleAccess accessRule="admin">
                <NextLink href="/articles/new" as="/articles/new" passHref>
                  <MenuItem>
                    <Link>New Article</Link>
                  </MenuItem>
                </NextLink>
              </RoleAccess>
              <NextLink href="/profile/[key]/articles" as={`/profile/${currentUser.key}/articles`} passHref>
                <MenuItem>
                  <Link>My articles</Link>
                </MenuItem>
              </NextLink>
              <RoleAccess accessRule="admin">
                <NextLink href={`/domains/new`} as="/domains/new" passHref>
                  <MenuItem>
                    <Link>New Domain</Link>
                  </MenuItem>
                </NextLink>
              </RoleAccess>
              <NextLink href={`/resources/new`} as="/resources/new" passHref>
                <MenuItem>
                  <Link>New Resource</Link>
                </MenuItem>
              </NextLink>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Stack direction="row" spacing={2}>
            <InternalLink routePath="/register" asHref="/register">
              Register
            </InternalLink>
            <InternalLink routePath="/login" asHref="/register">
              Login
            </InternalLink>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
