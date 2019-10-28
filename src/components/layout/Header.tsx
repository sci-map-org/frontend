import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/users.hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    color: 'inherit',
    textDecoration: 'none',
  },
  buttonLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

export const Header: React.FC<{}> = () => {
  const classes = useStyles({});
  const { currentUser, loading, error } = useCurrentUser();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <NavLink to="/" className={classes.title}>
            <Typography variant="h6">Apollo Project</Typography>
          </NavLink>
          <NavLink to="/register" className={classes.buttonLink}>
            <Button color="inherit">Register</Button>
          </NavLink>
          <NavLink to="/login" className={classes.buttonLink}>
            <Button color="inherit">Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};
