import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  IconButton,
  Link,
  LinkProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { omit } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { env } from '../../env';
import { useCurrentUser, useLogout } from '../../graphql/users/users.hooks';
import { LearningPathPagePath, NewDomainPagePath, ExploreMapPagePageInfo } from '../../pages/RoutesPageInfos';
import { globalStyleVariables } from '../../theme/theme';
import { RoleAccess } from '../auth/RoleAccess';
import { InternalLink, InternalLinkProps, PageLink } from '../navigation/InternalLink';
import { GlobalSearchBox } from '../navigation/search/GlobalSearchBox';
import { RiBubbleChartFill } from '@react-icons/all-files/ri/RiBubbleChartFill';
import { routerPushToPage } from '../../pages/PageInfo';

const HeaderLinkStyle: LinkProps = {
  fontWeight: 'light',
  color: 'blackAlpha.700',
  _hover: { color: 'blackAlpha.900' },
  _focus: {},
};

type HeaderLinkProps = (InternalLinkProps & { external?: false }) | ({ external: true } & LinkProps);
const HeaderLink: React.FC<HeaderLinkProps> = ({
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
  const showHamburger = useBreakpointValue({ base: true, md: false });
  const headerHamburgerLinks: (HeaderLinkProps & { name: string; show?: 'notLoggedIn' | 'loggedIn' })[] = [
    {
      routePath: '/areas',
      asHref: '/areas',
      name: 'Areas',
    },
    {
      routePath: '/about/[key]',
      asHref: '/about/introduction',
      name: 'About',
    },
    {
      href: env.DISCOURSE_FORUM_URL,
      external: true,
      name: 'Forum',
    },
    {
      routePath: '/register',
      asHref: '/register',
      name: 'Register',
      show: 'notLoggedIn',
    },
    {
      routePath: `/login?redirectTo=${encodeURIComponent(router.asPath)}`,
      asHref: `/login?redirectTo=${encodeURIComponent(router.asPath)}`,
      name: 'Login',
      show: 'notLoggedIn',
    },
  ];
  const learningPathLink = !!currentUser && (
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
  );

  return (
    <Box
      py={3}
      bg="white"
      pl={globalStyleVariables.leftPadding}
      pr={globalStyleVariables.rightPadding}
      fontSize="lg"
      display="flex"
      flexDirection="row"
      alignItems="center"
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
      <Stack direction="row" spacing={4} alignItems="center">
        {showHamburger && (
          <>
            <IconButton
              aria-label="explore"
              size="md"
              variant="ghost"
              icon={<RiBubbleChartFill />}
              p={0}
              _active={{}}
              _focus={{}}
              onClick={() => routerPushToPage(ExploreMapPagePageInfo)}
            />
            <GlobalSearchBox positionSuggestions="left" width={{ base: '120px', sm: '180px', md: '200px' }} />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                p={0}
                ml={2}
                _active={{}}
                _focus={{}}
                icon={<HamburgerIcon />}
                size="md"
                variant="ghost"
              />
              <MenuList>
                {headerHamburgerLinks.map(
                  ({ name, show, ...linkProps }) =>
                    !(show === 'notLoggedIn' && !!currentUser) && (
                      <HeaderLink key={name} {...linkProps}>
                        <MenuItem>{name}</MenuItem>
                      </HeaderLink>
                    )
                )}
              </MenuList>
            </Menu>
          </>
        )}
        {!showHamburger && (
          <PageLink pageInfo={ExploreMapPagePageInfo} {...HeaderLinkStyle}>
            Explore
          </PageLink>
        )}
        {!showHamburger && (
          <>
            <GlobalSearchBox />
            {learningPathLink}
            {headerHamburgerLinks.map(
              ({ name, show, ...linkProps }) =>
                !(show === 'notLoggedIn' && !!currentUser) && (
                  <HeaderLink key={name} {...linkProps}>
                    {name}
                  </HeaderLink>
                )
            )}
          </>
        )}

        {!!currentUser && (
          <Menu placement="bottom-end" isLazy>
            <MenuButton>
              <Avatar mt="1px" size="xs" name={currentUser.displayName} backgroundColor="gray.400">
                <AvatarBadge bg="green.500" boxSize="0.7rem" />
              </Avatar>
            </MenuButton>
            <MenuList bg="white" zIndex={100}>
              <NextLink href="/profile/[key]" as={`/profile/${currentUser.key}`} passHref>
                <MenuItem>
                  <Link>Profile</Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/profile/paths" as={`/profile/paths`} passHref>
                <MenuItem>
                  <Link>My Paths</Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/profile/goals" as={`/profile/goals`} passHref>
                <MenuItem>
                  <Link>My Goals</Link>
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
                    <Link>My Articles</Link>
                  </MenuItem>
                </NextLink>
              </RoleAccess>
              <RoleAccess accessRule="contributorOrAdmin">
                <NextLink href={NewDomainPagePath} as={NewDomainPagePath} passHref>
                  <MenuItem>
                    <Link>New Area</Link>
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
        )}
      </Stack>
    </Box>
  );
};
