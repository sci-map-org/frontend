import { useApolloClient } from '@apollo/react-hooks';
import { Box, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core';
import Cookies from 'js-cookie';
import NextLink from 'next/link';

import { CurrentUserOperation } from '../../graphql/users/users.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { HeaderLink } from './HeaderLink';
import { UserRole } from '../../graphql/types';

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
      <HeaderLink to="/domains">Domains</HeaderLink>
      <HeaderLink to="/about/intro">About</HeaderLink>
      {!!currentUser ? (
        <Box pr="2">
          <Menu>
            <MenuButton>
              {currentUser.key}
              {/* <Avatar size="xs">
                <AvatarBadge bg="green.500" size="0.7rem" />
              </Avatar> */}
            </MenuButton>
            <MenuList placement="bottom-end" bg="white">
              <NextLink href={`/profile/${currentUser.key}`}>
                <MenuItem>
                  <Link>Profile</Link>
                </MenuItem>
              </NextLink>
              <NextLink href={`/articles/new`}>
                <MenuItem>
                  <Link>New Article</Link>
                </MenuItem>
              </NextLink>
              <NextLink href={`/profile/${currentUser.key}/articles`}>
                <MenuItem>
                  <Link>My articles</Link>
                </MenuItem>
              </NextLink>
              {currentUser && currentUser.role === UserRole.Admin && (
                <NextLink href={`/domains/new`}>
                  <MenuItem>
                    <Link>New Domain</Link>
                  </MenuItem>
                </NextLink>
              )}
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
