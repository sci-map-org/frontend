import { Button, FormControl, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';
import React from 'react';

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

const register = async () => {};
export const RegisterPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item>
        <h2>Register</h2>
        <FormControl>
          <InputLabel htmlFor="register-email-address">Email address</InputLabel>
          <Input id="register-email-address"></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="register-password">Password</InputLabel>
          <Input id="register-password"></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <Button color="primary" onClick={register}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};
