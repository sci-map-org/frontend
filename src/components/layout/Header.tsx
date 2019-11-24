import { Box, Link, Avatar, AvatarBadge, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core';
import { HeaderLink } from './HeaderLink';
import { useApolloClient } from '@apollo/react-hooks';
import Cookies from 'js-cookie';
import { CurrentUserQuery } from '../../graphql/generated/queries';
import { useCurrentUser } from '../../hooks/users.hooks';
import NextLink from 'next/link';

export const Header: React.FC = () => {
  const client = useApolloClient();
  const { currentUser, loading } = useCurrentUser();
  const logout = () => {
    Cookies.remove('jwt_token');
    client.writeData({ data: { isLoggedIn: false } });
    client.writeQuery({
      query: CurrentUserQuery,
      data: { currentUser: null },
    });
  };

  return (
    <Box py={2} bg="gray.200" pl={2} fontSize="lg" display="flex" flexDirection="row">
      <HeaderLink to="/">Apollo Project</HeaderLink>
      <Box flexGrow={1} />
      <HeaderLink to="/about">About</HeaderLink>
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
