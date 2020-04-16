import {Link, Typography} from "@material-ui/core";
import React from "react";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/alexeybahter">
        My Website &nbsp;
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}