import { Icon, IconProps } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbLinkProps,
  IconButtonProps,
  Stack,
} from '@chakra-ui/react';
import { IconType } from '@react-icons/all-files/lib';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { shortenString } from '../../util/utils';
import { DomainIcon } from '../lib/icons/DomainIcon';

export interface BreadcrumbLink {
  name: string;
  path: string;
  routePath: string;
  breadcrumbLinkProps?: BreadcrumbLinkProps;
  renderIcon?: (props: Omit<IconProps, 'css'>) => ReactElement;
}

const sizeMapping: { [key in 'md' | 'sm']: { iconBoxSize: string } } = {
  sm: {
    iconBoxSize: '16px',
  },
  md: { iconBoxSize: '18px' },
};
export interface NavigationBreadcrumbsProps {
  links: BreadcrumbLink[];
  size?: 'md' | 'sm';
}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({ links, size = 'md' }) => {
  const router = useRouter();
  return (
    <Breadcrumb fontSize={size}>
      {links.map((link) =>
        router.asPath === link.path ? (
          <BreadcrumbItem key={link.path} isCurrentPage>
            <BreadcrumbLink {...link.breadcrumbLinkProps} _hover={{}} cursor="auto">
              {shortenString(link.name, 35)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={link.path}>
            <Stack direction="row" alignItems="center" spacing="1px">
              {/* {link.renderIcon && link.renderIcon({ mr: 1, boxSize: sizeMapping[size].iconBoxSize })} */}
              {/* Work on that later, rn cause quite a few issues */}
              <NextLink href={link.routePath} as={link.path} passHref>
                <BreadcrumbLink {...link.breadcrumbLinkProps} _focus={{}} _activeLink={{}}>
                  {shortenString(link.name, 35)}
                </BreadcrumbLink>
              </NextLink>
            </Stack>
          </BreadcrumbItem>
        )
      )}
    </Breadcrumb>
  );
};
