import {
  Avatar,
  AvatarBadge,
  Box,
  Link,
  LinkProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PseudoBox,
  Stack,
} from '@chakra-ui/core';
import getConfig from 'next/config';
import NextLink from 'next/link';
import { useCurrentUser, useLogout } from '../../graphql/users/users.hooks';
import { globalStyleVariables } from '../../theme/theme';
import { RoleAccess } from '../auth/RoleAccess';
import { InternalLink, InternalLinkProps } from '../navigation/InternalLink';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();

const HeaderLink: React.FC<(InternalLinkProps & { external?: false }) | ({ external: true } & LinkProps)> = ({
  children,
  ...props
}) =>
  props.external ? (
    <Box>
      <Link
        {...props}
        fontWeight="light"
        color="blackAlpha.700"
        _hover={{ color: 'blackAlpha.900' }}
        _focus={{}}
        isExternal
      >
        {children}
      </Link>
    </Box>
  ) : (
    <InternalLink {...props} fontWeight="light" color="blackAlpha.700" _hover={{ color: 'blackAlpha.900' }} _focus={{}}>
      {children}
    </InternalLink>
  );
export const Header: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const { logout } = useLogout();

  return (
    <PseudoBox
      py={3}
      bg="white"
      pl={globalStyleVariables.leftPadding}
      pr={globalStyleVariables.rightPadding}
      fontSize="lg"
      display="flex"
      flexDirection="row"
      borderBottomColor="grayDivider.300"
      borderBottomWidth="1px"
      as="header"
    >
      <InternalLink
        routePath="/"
        asHref="/"
        color="blackAlpha.700"
        fontWeight="medium"
        _focus={{}}
        _hover={{ color: 'blackAlpha.900' }}
      >
        Sci-Map.org
      </InternalLink>
      <Box flexGrow={1} />
      <Stack direction="row" spacing={4}>
        <HeaderLink routePath="/domains" asHref="/domains">
          Domains
        </HeaderLink>
        <HeaderLink routePath="/about/[key]" asHref="/about/intro">
          About
        </HeaderLink>
        <HeaderLink href={publicRuntimeConfig.discourseForumUrl} external>
          Forum
        </HeaderLink>
        {!!currentUser ? (
          <Menu>
            <MenuButton>
              <Avatar mt="1px" size="xs" name={currentUser.displayName} backgroundColor="gray.400">
                <AvatarBadge bg="green.500" size="0.7rem" />
              </Avatar>
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
              <RoleAccess accessRule="admin">
                <NextLink href="/profile/[key]/articles" as={`/profile/${currentUser.key}/articles`} passHref>
                  <MenuItem>
                    <Link>My articles</Link>
                  </MenuItem>
                </NextLink>
              </RoleAccess>
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
          <Stack direction="row" spacing={4}>
            <HeaderLink routePath="/register" asHref="/register">
              Register
            </HeaderLink>
            <HeaderLink routePath={`/login?redirectTo=${router.asPath}`} asHref={`/login?redirectTo=${router.asPath}`}>
              Login
            </HeaderLink>
          </Stack>
        )}
      </Stack>
    </PseudoBox>
  );
};
