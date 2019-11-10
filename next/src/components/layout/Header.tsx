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
import Link from 'next/link';

import { CurrentUserQuery } from '../../graphql/generated/queries';
import { useCurrentUser } from '../../hooks/users.hooks';

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
  // const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/">
              <a className={classes.title}>Apollo Project {!!currentUser && currentUser.email}</a>
            </Link>
          </Typography>
          <div className={classes.grow}></div>
          <Link href="/about">
            <Button className={classes.buttonLink} color="inherit">
              About
            </Button>
          </Link>
          {!currentUser && !loading && (
            <>
              <Link href="/register">
                <Button color="inherit" className={classes.buttonLink}>
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button color="inherit" className={classes.buttonLink}>
                  Login
                </Button>
              </Link>
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
                    // history.push(`/profile/${currentUser.key}`);
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
