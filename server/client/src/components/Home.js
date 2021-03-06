import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [showBtn, setShowBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callHomePage();
  }, []);

  const callHomePage = async () => {
    try {
      setLoading(true);
      const res = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      const data = await res.json();
      setUserName(data.username);
      setShowBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center" style={{ color: "grey", marginTop: "200px" }}>
        Data is loading...
      </h1>
    );
  }

  return (
    <div>
      <div
        className="container-mt-5 text-center"
        style={{ marginTop: "200px" }}
      >
        <h1>
          Welcome{" "}
          <span
            style={{
              fontSize: "70px",
              textShadow: "3px 3px 5px #2c2c2c",
              color: "tomato",
            }}
          >
            {userName}
          </span>
        </h1>
        <NavLink to="/signup">
          {showBtn === true ? (
            <Button variant="info">Click Here to Sign Up</Button>
          ) : null}
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
