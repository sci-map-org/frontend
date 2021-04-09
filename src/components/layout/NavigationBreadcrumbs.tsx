import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbLinkProps, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { shortenString } from '../../util/utils';

export interface BreadcrumbLink {
  name: string;
  path: string;
  routePath: string;
  breadcrumbLinkProps?: BreadcrumbLinkProps;
}

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
