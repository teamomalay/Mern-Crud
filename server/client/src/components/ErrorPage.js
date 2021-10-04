import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <div>
      <div
        className="container-mt-5 text-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Oops ! Page not Found...Go Back to Home Page</h1>
        <NavLink to="/">
          <Button variant="info">Home Page</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
