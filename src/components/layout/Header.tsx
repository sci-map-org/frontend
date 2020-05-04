import { Box, Link, Menu, MenuButton, MenuItem, MenuList, Avatar, AvatarBadge, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useCurrentUser, useLogout } from '../../graphql/users/users.hooks';
import { RoleAccess } from '../auth/RoleAccess';
import { HeaderLink } from './HeaderLink';

export const Header: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { logout } = useLogout();

  return (
    <Box py={2} bg="gray.200" pl={2} fontSize="lg" display="flex" flexDirection="row">
      <HeaderLink to="/">Apollo Project</HeaderLink>
      <Box flexGrow={1} />
      <HeaderLink to="/domains">Domains</HeaderLink>
      <HeaderLink to="/about/intro">About</HeaderLink>
      {!!currentUser ? (
        <Box pr="2">
          <Menu>
            <MenuButton>
              {currentUser.key}
              {/* <Avatar size="xs" ml={2}>
                <AvatarBadge bg="green.500" size="0.7rem" />
              </Avatar> */}
            </MenuButton>
            <MenuList placement="bottom-end" bg="white">
              <NextLink href={`/profile/${currentUser.key}`}>
                <MenuItem>
                  <Link>Profile</Link>
                </MenuItem>
              </NextLink>
              <RoleAccess accessRule="admin">
                <NextLink href={`/articles/new`}>
                  <MenuItem>
                    <Link>New Article</Link>
                  </MenuItem>
                </NextLink>
              </RoleAccess>
              <NextLink href={`/profile/${currentUser.key}/articles`}>
                <MenuItem>
                  <Link>My articles</Link>
                </MenuItem>
              </NextLink>
              <RoleAccess accessRule="admin">
                <NextLink href={`/domains/new`}>
                  <MenuItem>
                    <Link>New Domain</Link>
                  </MenuItem>
                </NextLink>
              </RoleAccess>
              <NextLink href={`/resources/new`}>
                <MenuItem>
                  <Link>New Resource</Link>
                </MenuItem>
              </NextLink>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <>
          <HeaderLink to="/register">Register</HeaderLink>
          <HeaderLink to="/login">Login</HeaderLink>
        </>
      )}
    </Box>
  );
};
