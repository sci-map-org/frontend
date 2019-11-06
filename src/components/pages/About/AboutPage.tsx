import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { AboutArticle } from './AboutArticle';

export const aboutPagePath = '/about';

const useStyles = makeStyles(theme => ({
  summary: {
    width: 260,
    height: '100%',
    backgroundColor: 'rgb(250, 250, 250)',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: 'rgba(0,0,0,0.07)',
    display: 'flex',
    flexFlow: 'column',
  },
  page: {
    display: 'flex',
    height: '100%',
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  listLinks: {
    paddingInlineStart: '20px',
    listStyle: 'none',
    textAlign: 'left',
    marginTop: '5px',
  },
  summaryItem: {
    paddingTop: '8px',
    paddingBottom: '7px',
  },
  summaryLinkItem: {
    color: 'rgb(54, 65, 73)',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  activeSummaryLinkItem: {
    color: 'rgb(0, 140, 255);',
  },
  pageContent: {
    height: '100%',
    width: '100%',
  },
}));

export interface ArticleMenuItem {
  _id: string;
  menuTitle: string;
  key: string;
}

const articles: ArticleMenuItem[] = [
  {
    _id: '0',
    menuTitle: 'About',
    key: 'intro',
  },
  {
    _id: '1',
    menuTitle: 'Hello',
    key: 'hello',
  },
  {
    _id: '2',
    menuTitle: 'World',
    key: 'world',
  },
];

export const AboutPage: React.FC<{}> = () => {
  const classes = useStyles();
  let routeMatch = useRouteMatch();

  if (!routeMatch) return null;
  return (
    <div className={classes.page}>
      <nav className={classes.summary}>
        <ul className={classes.listLinks}>
          {articles.map(article => (
            <SummaryItem article={article} key={article._id} />
          ))}
        </ul>
        <div className={classes.grow}></div>
      </nav>
      <div className={classes.pageContent}>
        <Switch>
          <Route path={`${aboutPagePath}/:articleKey`}>
            <AboutArticle articleMenuItems={articles} />
          </Route>
          <Redirect to={`${aboutPagePath}/${articles[0].key}`} />
        </Switch>
      </div>
    </div>
  );
};

const SummaryItem: React.FC<{ article: ArticleMenuItem }> = ({ article }) => {
  const classes = useStyles();
  let routeMatch = useRouteMatch();

  if (!routeMatch) return null;

  return (
    <li className={classes.summaryItem}>
      <NavLink
        to={`${aboutPagePath}/${article.key}`}
        className={classes.summaryLinkItem}
        activeClassName={classes.activeSummaryLinkItem}
        exact
      >
        {article.menuTitle}
      </NavLink>
    </li>
  );
};
