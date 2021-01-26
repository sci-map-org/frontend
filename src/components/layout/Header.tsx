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
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  Stack,
  PopoverTrigger,
  Divider,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { omit } from 'lodash';
import getConfig from 'next/config';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser, useLogout } from '../../graphql/users/users.hooks';
import { LearningPathPagePath } from '../../pages/RoutesPageInfos';
import { globalStyleVariables } from '../../theme/theme';
import { RoleAccess } from '../auth/RoleAccess';
import { InternalLink, InternalLinkProps } from '../navigation/InternalLink';

const { publicRuntimeConfig } = getConfig();

const HeaderLinkStyle: LinkProps = {
  fontWeight: 'light',
  color: 'blackAlpha.700',
  _hover: { color: 'blackAlpha.900' },
  _focus: {},
};
const HeaderLink: React.FC<(InternalLinkProps & { external?: false }) | ({ external: true } & LinkProps)> = ({
  children,
  ...props // not taking out 'external' prop as it would mess with the ts trick
}) =>
  props.external ? (
    <Box>
      <Link {...omit(props, 'external')} {...HeaderLinkStyle} isExternal>
        {children}
      </Link>
    </Box>
  ) : (
    <InternalLink {...omit(props, 'external')} {...HeaderLinkStyle}>
      {children}
    </InternalLink>
  );
export const Header: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const { logout } = useLogout();
  const { onOpen: openOpenLP, onClose: onCloseLP, isOpen: isOpenLp } = useDisclosure();
  return (
    <Box
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
        color="mainDarker"
        fontWeight="medium"
        _focus={{}}
        _hover={{ color: 'brand.800' }}
      >
        Sci-Map.org
      </InternalLink>
      <Box flexGrow={1} />

      <Stack direction="row" spacing={4}>
        {!!currentUser && (
          <Popover placement="bottom" isOpen={isOpenLp} onClose={onCloseLP} onOpen={openOpenLP} isLazy>
            <PopoverTrigger>
              <Link {...HeaderLinkStyle}>My Learning Paths</Link>
            </PopoverTrigger>
            <PopoverContent
              zIndex={4}
              width="260px"
              backgroundColor="backgroundColor.0"
              borderRadius={6}
              _focus={{ outline: 'none' }}
              {...(isOpenLp
                ? {
                    borderWidth: 1,
                    borderColor: 'gray.300',
                  }
                : { borderWidth: 0 })} // To fix an issue where a line can me seen for a few ms when closing the popover
            >
              <PopoverArrow zIndex={5} />
              <PopoverBody pt={1}>
                <Flex direction="column" alignItems="stretch" spacing={0}>
                  {!!currentUser.startedLearningPaths && !!currentUser.startedLearningPaths.length && (
                    <>
                      <Stack>
                        {currentUser.startedLearningPaths.map(({ learningPath }) => (
                          <InternalLink
                            key={learningPath._id}
                            routePath={LearningPathPagePath()}
                            asHref={LearningPathPagePath(learningPath.key)}
                            {...HeaderLinkStyle}
                            fontSize="md"
                          >
                            {learningPath.name}
                          </InternalLink>
                        ))}
                      </Stack>
                      <Divider my={2} />
                    </>
                  )}
                  <InternalLink
                    textAlign="center"
                    routePath="/learning_paths/new"
                    asHref="/learning_paths/new"
                    {...HeaderLinkStyle}
                    fontSize="md"
                    fontWeight={500}
                  >
                    Create Learning Path
                  </InternalLink>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
        <HeaderLink routePath="/domains" asHref="/domains">
          Topics
        </HeaderLink>
        <HeaderLink routePath="/about/[key]" asHref="/about/introduction">
          About
        </HeaderLink>
        <HeaderLink href={publicRuntimeConfig.discourseForumUrl} external>
          Forum
        </HeaderLink>
        {!!currentUser ? (
          <Menu placement="bottom-end" isLazy>
            <MenuButton>
              <Avatar mt="1px" size="xs" name={currentUser.displayName} backgroundColor="gray.400">
                <AvatarBadge bg="green.500" boxSize="0.7rem" />
              </Avatar>
            </MenuButton>
            <MenuList bg="white">
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
              <RoleAccess accessRule="contributorOrAdmin">
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
    </Box>
  );
};
