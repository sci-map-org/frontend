import { Grid, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { useCurrentUser } from '../../../hooks/users.hooks';
import { ArticleList } from '../../lib/articles/ArticleList';
import { ArticleListPage } from './ArticleListPage';
import { CreateArticlePage } from './CreateArticlePage';

export const profilePagePath = (key = ':key') => `/profile/${key}`;

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
  },
  menu: {
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.appBar - 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export const ProfilePage: React.FC<{}> = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUser();
  const { key } = useParams();
  const routeMatch = useRouteMatch();
  let user: any;
  if (!routeMatch) return null;
  if (currentUser && currentUser.key === key)
    return (
      <Grid className={classes.root} direction="row" container>
        <Grid item>
          <List className={classes.menu}>
            <ListItem button component={Link} to={routeMatch.url}>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button component={Link} to={`${routeMatch.url}/articles/new`}>
              <ListItemText primary="Create Article" />
            </ListItem>
            <ListItem button component={Link} to={`${routeMatch.url}/articles`}>
              <ListItemText primary="My Articles" />
            </ListItem>
          </List>
        </Grid>
        <Grid md>
          <Switch>
            <Route path={`${routeMatch.url}/articles/new`}>
              <CreateArticlePage />
            </Route>
            <Route path={`${routeMatch.url}/articles`}>
              <ArticleListPage />
            </Route>
            <Route path={routeMatch.url}>
              <h2>My Profile</h2>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    );
  return (
    <div>
      <h2>Profile of another user</h2>
      {/* <h3>{!!currentUser && currentUser.email}</h3> */}
    </div>
  );
};
