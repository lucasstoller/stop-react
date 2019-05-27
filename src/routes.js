import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Board from './pages/Board/Board';
import Room from './pages/Room/Room';
import FourOhFour from './pages/404';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" component={ SignIn } />
      <Route path="/signup" component={ SignUp } />
      <Route exact path="/home" component={ Home } />
      <Route path="/room/:id" component={ Room } />
      <PrivateRoute path="/board" component={ Board } />
      <Route path="*" component={ FourOhFour } />
    </Switch>
  </BrowserRouter>
);

export default Routes;