import { Button, FormControl, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useLogin } from '../../hooks/auth.hooks';
import { useHistory } from 'react-router';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error } = useLogin();
  const history = useHistory();
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
        <Button
          color="primary"
          onClick={async () => {
            await login({ variables: { email, password } });
            history.push('/');
          }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};
