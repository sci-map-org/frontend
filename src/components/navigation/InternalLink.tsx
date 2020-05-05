import { Link, Button, LinkProps, ButtonProps } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';

export const InternalLink: React.FC<{ routePath: string; asHref: string } & LinkProps> = ({
  routePath,
  asHref,
  children,
  ...linkProps
}) => {
  return (
    <NextLink href={routePath} as={asHref} passHref>
      <Link {...linkProps}>{children}</Link>
    </NextLink>
  );
};

export const InternalButtonLink: React.FC<
  { routePath: string; asHref: string; loggedInOnly?: boolean } & ButtonProps
> = ({ routePath, asHref, children, loggedInOnly, ...buttonProps }) => {
  const { currentUser } = useCurrentUser();
  const { onOpen } = useUnauthentificatedModal();
  return (
    <NextLink href={routePath} as={asHref} passHref>
      <Button
        {...buttonProps}
        onClick={(e) => {
          if (loggedInOnly && !currentUser) {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {children}
      </Button>
    </NextLink>
  );
};
