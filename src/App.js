import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';
import {
  Switch,
  Route
} from "react-router-dom";

import { ProvideAuth } from "./hooks/useAuth";
import { Navbar } from "./components/Navbar"
import { Copyright } from "./ui/Copyright"
import { Home } from "./pages/Home"
import { SignUp, SignIn } from "./pages"

import {useStyles} from './styles';

function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.app}>
        <Switch>
          <ProvideAuth>
           <Navbar />
           <Route path="/sign-up" component={SignUp} exact />
           <Route path="/sign-in" component={SignIn} exact />
           <Route path="/" component={Home} exact />
          </ProvideAuth>
        </Switch>
      </div>
    <Copyright/>
    </>
  );
}

export default App;
