import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import NextLink from 'next/link';

export interface BreadcrumbLink {
  name: string;
  path: string;
  currentPage?: boolean;
}
export interface NavigationBreadcrumbsProps {
  links: BreadcrumbLink[];
}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({ links }) => {
  return (
    <Breadcrumb>
      {links.map(link => (
        <BreadcrumbItem key={link.path}>
          <NextLink href={link.path}>
            <BreadcrumbLink>{link.name}</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
