import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { UserContext } from "../App";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const callLogoutPage = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        dispatch({ type: "USER", payload: false });
        window.alert("Logged Out...");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-mt-5 text-center" style={{ marginTop: "200px" }}>
      <h1>Do You Really Want To Logout ?</h1>
      <Button variant="danger" onClick={callLogoutPage}>
        logout
      </Button>
    </div>
  );
};

export default Logout;
