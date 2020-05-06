import React from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useRouter } from "../../hooks/useRouter";

import { useStyles } from './styles';

export const Navbar = () => {
  const auth = useRequireAuth();
  const router = useRouter();

  const classes = useStyles();

  if (!auth.user && !(router.pathname === '/')) {
    return ""
  }
  return (
    <>
      <CssBaseline/>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Typography variant="h6" color="inherit" noWrap>
            PW Transactions App
          </Typography>
          <Button onClick={auth.signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};