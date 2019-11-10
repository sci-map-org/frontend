import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import React from 'react';
import { Link } from 'react-router-dom';

import { articlePagePath } from '../../pages/ArticlePage';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    flexGrow: 1,
  },
});

export const ArticleList: React.FC<{}> = props => {
  const classes = useStyles();
  const articles = [
    {
      key: '1',
    },
    {
      key: '2',
    },
  ];
  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography variant="h3" className={classes.title}>
          Articles
        </Typography>
      </Grid>
      <Grid container item>
        <Grid item md></Grid>
        <Grid item md={6}>
          <List
            dense={false}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Articles
              </ListSubheader>
            }
          >
            {articles.map(article => (
              <ListItem button component={Link} to={articlePagePath(article.key)}>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md></Grid>
      </Grid>
    </Grid>
  );
};
