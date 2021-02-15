import { Link, Button, LinkProps, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../../pages/PageInfo';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';

export type InternalLinkProps = { asHref: string; routePath: string; isDisabled?: boolean } & LinkProps;

export const InternalLink: React.FC<InternalLinkProps> = forwardRef<HTMLAnchorElement, InternalLinkProps>(
  ({ asHref, routePath, isDisabled, children, ...linkProps }, ref) => {
    return (
      <NextLink href={routePath} as={asHref} passHref>
        <Link ref={ref} {...linkProps}>
          {children}
        </Link>
      </NextLink>
    );
  }
);

export const PageLink = forwardRef<HTMLAnchorElement, { pageInfo: PageInfo; isDisabled?: boolean } & LinkProps>(
  ({ pageInfo, ...props }, ref) => {
    return (
      <InternalLink
        routePath={pageInfo.routePath}
        asHref={pageInfo.path}
        {...pageInfo.breadcrumbLinkProps}
        {...props}
      />
    );
  }
);

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
