import React, { useContext } from "react";
import Logout from "./Logout";
import { Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Products from "./Products";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import { UserContext } from "../App";

const Routing = () => {
  const { state } = useContext(UserContext);

  console.log(state);
  if (state == true) {
    return (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </>
    );
  }
};

export default Routing;
