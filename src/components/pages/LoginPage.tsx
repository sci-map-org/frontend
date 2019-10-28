import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, FormControl, InputLabel, Input, Grid, makeStyles } from '@material-ui/core';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../graphql/queries/auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    flexGrow: 2,
  },
}));

export const LoginPage: React.FC<{}> = () => {
  const client = useApolloClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      Cookies.set('jwt_token', login.jwt);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item>
        <h2>Login</h2>
        <FormControl>
          <InputLabel htmlFor="register-email-address">Email address</InputLabel>
          <Input id="register-email-address" value={email} onChange={e => setEmail(e.target.value)}></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="register-password">Password</InputLabel>
          <Input
            id="register-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <Button color="primary" onClick={() => login({ variables: { email, password } })}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};
