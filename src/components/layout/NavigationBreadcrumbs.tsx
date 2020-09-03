import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export interface BreadcrumbLink {
  name: string;
  path: string;
  routePath: string;
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
            <BreadcrumbLink>{link.name}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={link.path}>
            <NextLink href={link.routePath} as={link.path} passHref>
              <BreadcrumbLink>{link.name}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )
      )}
    </Breadcrumb>
  );
};
