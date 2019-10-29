import { Button, FormControl, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useRegister } from '../../hooks/auth.hooks';

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

export const RegisterPage: React.FC<{}> = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const [displayName, setDisplayName] = useState('');
  const [uniqueName, setUniqueName] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading, error } = useRegister();
  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item>
        <h2>Register</h2>
      </Grid>

      <Grid>
        <FormControl>
          <InputLabel htmlFor="register-email-address">Email address</InputLabel>
          <Input id="register-email-address" value={email} onChange={e => setEmail(e.target.value)}></Input>
        </FormControl>
      </Grid>

      <Grid>
        <FormControl>
          <InputLabel htmlFor="register-display-name">Display Name</InputLabel>
          <Input id="register-display-name" value={displayName} onChange={e => setDisplayName(e.target.value)}></Input>
        </FormControl>
      </Grid>

      <Grid>
        <FormControl>
          <InputLabel htmlFor="register-unique-name">Unique alias</InputLabel>
          <Input id="register-unique-name" value={uniqueName} onChange={e => setUniqueName(e.target.value)}></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="register-password">Password</InputLabel>
          <Input
            id="register-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          ></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          onClick={() =>
            register({
              variables: {
                payload: {
                  uniqueName,
                  email,
                  password,
                  displayName,
                },
              },
            })
          }
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};
