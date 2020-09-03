import { BreadcrumbLink } from '../components/layout/NavigationBreadcrumbs';
import Router from 'next/router';

export interface PageInfo extends BreadcrumbLink {}

export const routerPushToPage = (pageInfo: PageInfo) => {
  Router.push(pageInfo.routePath, pageInfo.path);
};
