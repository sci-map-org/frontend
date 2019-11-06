import React from 'react';
import { ArticleMenuItem, aboutPagePath } from './AboutPage';
import { useParams, Redirect, useRouteMatch } from 'react-router';

export const AboutArticle: React.FC<{ articleMenuItems: ArticleMenuItem[] }> = ({ articleMenuItems }) => {
  const { articleKey } = useParams();
  const routeMatch = useRouteMatch();

  const article = articleMenuItems.find(article => article.key === articleKey);

  if (!routeMatch) return null;

  if (!article) return <Redirect to={`${aboutPagePath}/${articleMenuItems[0].key}`} />;

  return <div>{JSON.stringify(article)}</div>;
};
