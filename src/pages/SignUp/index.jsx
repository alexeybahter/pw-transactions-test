import React, { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Grid,
  Container,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';

import { Alert } from "../../ui";
import { useAuth, useRouter } from '../../hooks';
import { useStyles } from './styles';

export const SignUp = () => {

  const [alert, setAlert] = useState({open: false, type: '', message: ''});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRecovery, setPasswordRecovery] = useState('');


  const classes = useStyles();

  const router = useRouter();
  const auth = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordRecovery) {
      return setAlert( (alert) => ({...alert, type: 'error', message: 'Passwords don\'t match', open: true}));
    }
    const {data: { user, errors }} = await auth.signUp(name, email, password)

    user && router.push('/');

    errors && setAlert( (alert) => ({...alert, type: 'error', message: errors[0].msg, open: true}));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onInput={e=>setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                value={email}
                onInput={e=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onInput={e=>setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                name="password_recovery"
                label="Password Recovery"
                type="password"
                id="password_recovery"
                value={passwordRecovery}
                onInput={e=>setPasswordRecovery(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Alert alert={alert} setAlert={setAlert}/>
    </Container>
  );
};