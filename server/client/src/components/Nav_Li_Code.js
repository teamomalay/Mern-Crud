import React, { useContext } from "react";
import { UserContext } from "../App";
import { NavLink } from "react-router-dom";

const Nav_Li_Code = () => {
  const { state } = useContext(UserContext);

  if (state === true) {
    return (
      <>
        <li className="nav-item active">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li className="nav-item active">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Log In
          </NavLink>
        </li>
      </>
    );
  }
};

export default Nav_Li_Code;
