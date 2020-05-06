import React from "react";
import {
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';

import { useStyles } from './styles';

export const UserInfo = ({auth: { user }, pwCount}) => {
  const classes = useStyles();

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h4" align="center">
          User Info
        </Typography>
        {user === null ?
          <CircularProgress className={classes.center}/>
        :
        <>
          <Typography component="h1" variant="h6" align="center">
            Name: {user.name}
          </Typography>
          <Typography component="h1" variant="h6" align="center">
            Email: {user.email}
          </Typography>
          <Typography component="h1" variant="h6" align="center">
            Count: PW {pwCount}
          </Typography>
        </>}
      </Paper>
    </main>
  )
};
