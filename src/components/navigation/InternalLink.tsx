import { Link, Button, LinkProps, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { forwardRef } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../../pages/PageInfo';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';

export type InternalLinkProps = {
  asHref: string;
  routePath: string;
  query?: ParsedUrlQuery;
  isDisabled?: boolean;
} & LinkProps;

export const InternalLink = forwardRef<HTMLAnchorElement, InternalLinkProps>(
  ({ asHref, routePath, isDisabled, children, query, isExternal, ...linkProps }, ref) => {
    return isExternal ? (
      <Link ref={ref} href={asHref} {...linkProps} isExternal>
        {children}
      </Link>
    ) : (
      <NextLink href={{ pathname: routePath, query }} as={asHref} passHref>
        <Link ref={ref} {...linkProps}>
          {children}
        </Link>
      </NextLink>
    );
  }
);

export interface PageLinkProps extends LinkProps {
  pageInfo: PageInfo;
  isDisabled?: boolean;
}

export const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>(({ pageInfo, ...props }, ref) => {
  return (
    <InternalLink
      ref={ref}
      routePath={pageInfo.routePath}
      asHref={pageInfo.path}
      {...pageInfo.breadcrumbLinkProps}
      {...props}
    />
  );
});

interface InternalButtonLinkProps extends ButtonProps {
  routePath: string;
  asHref: string;
  loggedInOnly?: boolean;
}
export const InternalButtonLink: React.FC<InternalButtonLinkProps> = ({
  routePath,
  asHref,
  children,
  loggedInOnly,
  ...buttonProps
}) => {
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

export const PageButtonLink: React.FC<
  { pageInfo: PageInfo } & Omit<InternalButtonLinkProps, 'routePath' | 'asHref'>
> = ({ pageInfo, children, ...buttonLinkProps }) => {
  return (
    <InternalButtonLink routePath={pageInfo.routePath} asHref={pageInfo.path} {...buttonLinkProps}>
      {children}
    </InternalButtonLink>
  );
};
