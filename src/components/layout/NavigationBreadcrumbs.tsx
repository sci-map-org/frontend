import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbLinkProps } from '@chakra-ui/react';
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
}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({ links }) => {
  const router = useRouter();

  return (
    <Breadcrumb>
      {links.map((link) =>
        router.route === link.routePath ? (
          <BreadcrumbItem key={link.path} isCurrentPage>
            <BreadcrumbLink {...link.breadcrumbLinkProps} _hover={{}} cursor="auto">
              {shortenString(link.name, 35)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={link.path}>
            <NextLink href={link.routePath} as={link.path} passHref>
              <BreadcrumbLink {...link.breadcrumbLinkProps}>{shortenString(link.name, 35)}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )
      )}
    </Breadcrumb>
  );
};
