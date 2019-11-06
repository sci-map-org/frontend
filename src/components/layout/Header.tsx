import { useApolloClient } from '@apollo/react-hooks';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { CurrentUserQuery } from '../../graphql/generated/queries';
import { useCurrentUser } from '../../hooks/users.hooks';
import { profilePagePath } from '../pages/Profile/ProfilePage';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  grow: {
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
  const { currentUser, loading } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const client = useApolloClient();

  const logout = () => {
    Cookies.remove('jwt_token');
    client.writeData({ data: { isLoggedIn: false } });
    client.writeQuery({
      query: CurrentUserQuery,
      data: { currentUser: null },
    });
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <NavLink to="/" className={classes.title}>
              Apollo Project {!!currentUser && currentUser.email}
            </NavLink>
          </Typography>
          <div className={classes.grow}></div>
          <NavLink to="/about" className={classes.buttonLink}>
            <Button color="inherit">About</Button>
          </NavLink>
          {!currentUser && !loading && (
            <>
              <NavLink to="/register" className={classes.buttonLink}>
                <Button color="inherit">Register</Button>
              </NavLink>
              <NavLink to="/login" className={classes.buttonLink}>
                <Button color="inherit">Login</Button>
              </NavLink>
            </>
          )}
          {!!currentUser && (
            <>
              <IconButton
                // edge="end"
                // aria-label="account of current user"
                // aria-controls="primary-search-account-menu"
                // aria-haspopup="true"
                // color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                // transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    history.push(profilePagePath(currentUser.key));
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
