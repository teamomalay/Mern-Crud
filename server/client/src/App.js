import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Products";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Navbarr from "./components/Navbarr";
import Logout from "./components/Logout";

const App = () => {
  return (
    <div>
      <Navbarr />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
