import React from "react";
import { Alert as AlertUI } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export const Alert = ({ alert, setAlert, ...props}) => {
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={4000}
      onClose={() => setAlert({...alert, open: false})}
    >
      <AlertUI
        elevation={6}
        variant="filled"
        onClose={() => setAlert({...alert, open: false})}
        severity={alert.type}
        {...props}
      >
          {alert.message}
      </AlertUI>
    </Snackbar>
  )
}
