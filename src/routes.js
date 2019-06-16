import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Board from './pages/Board/Board';
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
  <Router>
      <Switch>
        <PrivateRoute exact path="/home" component={ Home } />
        <PrivateRoute exact path="/room/:id" component={ Room } />      
        <PrivateRoute path="/rooms/:id/board" component={ Board } />      
        <Route path="/signin" component={ SignIn } />
        <Route path="/signup" component={ SignUp } />
        <Route path="*" component={ FourOhFour } />
      </Switch>
  </Router>
);

export default Routes;