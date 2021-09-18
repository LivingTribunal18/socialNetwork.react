import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import Appbar from "./components/UI/Appbar/appbar";
import Nav from "./components/UI/Nav/nav";
import ProfilePage from "./components/profilePage/profilePage";
import Messages from "./components/Messages/messages";
import Users from "./components/users/users";
import Login from "./components/login/login";
import Loader from "./components/UI/loader/loader";

import { connect } from "react-redux";
import { checkLogged, logOut } from "./store/actions/auth";

function App(props) {
  const [routes, setRoutes] = useState();

  useEffect(() => {
    props.checkLogged();
  }, []);

  useEffect(() => {
    if (!props.initialization) {
      if (props.logged) {
        setRoutes(
          <Switch>
            <Route path="/profile/:id" component={ProfilePage} />
            <Route exact path={["/", "/profile"]} component={ProfilePage} />
            <Route path="/messages" component={Messages} />
            <Route path="/users" component={Users} />
            <Redirect to="/" />
          </Switch>
        );
      } else {
        setRoutes(
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        );
      }
    }
  }, [props.initialization]);

  return (
    <Router>
      {!props.initialization ? (
        <Loader />
      ) : (
        <div style={{ display: "flex" }}>
          <CssBaseline />
          <Appbar logOut={props.logOut} logged={props.logged} />
          <Nav />
          <div style={{ flexGrow: "1", paddingTop: "0", padding: "20px" }}>
            {routes}
          </div>
        </div>
      )}
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    initialization: state.auth.initialization,
    logged: state.auth.logged,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkLogged: () => dispatch(checkLogged()),
    logOut: () => dispatch(logOut()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
