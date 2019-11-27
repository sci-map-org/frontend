import { useApolloClient } from '@apollo/react-hooks';
import { Avatar, AvatarBadge, Box, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core';
import Cookies from 'js-cookie';
import NextLink from 'next/link';

import { CurrentUserOperation } from '../../graphql/users/users.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { HeaderLink } from './HeaderLink';

export const Header: React.FC = () => {
  const client = useApolloClient();
  const { currentUser, loading } = useCurrentUser();

  const logout = () => {
    Cookies.remove('jwt_token');
    client.writeData({ data: { isLoggedIn: false } });
    client.writeQuery({
      query: CurrentUserOperation,
      data: { currentUser: null },
    });
  };

  return (
    <Box py={2} bg="gray.200" pl={2} fontSize="lg" display="flex" flexDirection="row">
      <HeaderLink to="/">Apollo Project</HeaderLink>
      <Box flexGrow={1} />
      <HeaderLink to="/about/intro">About</HeaderLink>
      {!!currentUser ? (
        <Box pr="2">
          <Menu>
            <MenuButton>
              <Avatar size="xs">
                <AvatarBadge bg="green.500" size="0.7rem" />
              </Avatar>
            </MenuButton>
            <MenuList placement="bottom-end" bg="inherit">
              <NextLink href={`/profile/${currentUser.key}`}>
                <MenuItem>
                  <Link>Profile</Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/articles/new">
                <MenuItem>
                  <Link>New Article</Link>
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
