import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <div
        className="container-mt-5 text-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Welcome</h1>
        <NavLink to="/signup">
          <Button variant="info">Click Here to Sign Up</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
