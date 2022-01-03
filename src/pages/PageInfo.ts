import { BreadcrumbLink } from '../components/layout/NavigationBreadcrumbs';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export interface PageInfo extends BreadcrumbLink {
  query?: ParsedUrlQuery;
}

export const routerPushToPage = (
  pageInfo: PageInfo,
  options?: {
    query: ParsedUrlQuery;
  }
) => {
  Router.push({ pathname: pageInfo.path, query: { ...options?.query, ...pageInfo.query } }, pageInfo.path);
};
