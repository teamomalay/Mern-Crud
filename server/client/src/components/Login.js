import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { NavLink,useHistory } from "react-router-dom";


const Login = () => {
  const history=useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginClick= async (e)=>{
       e.preventDefault();
       const res=await fetch("/signin",{
         method:"POST",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({email,password})
       })
      

  const data = await res.json();

  if (res.status === 400 || !data) {
    window.alert("Invalid Credentials");
    console.log("Invalid Credentials")
} else {
    window.alert("Login Successfull");
    console.log("login Succesfull")
    history.push("/");
}
}




  return (
    <>
      <div
        className="container text-center"
        style={{ width: "400px", marginTop: "50px" }}
      >
        <h3
          className="mb-4"
          style={{
            color: "teal",
            textShadow: "3px 3px 5px #2c2c2c",
            textDecoration: "underline",
          }}
        >
          User Log In
        </h3>
        <InputGroup className="mb-3">
          <FormControl
          autoComplete="off"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
          autoComplete="off"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputGroup>
        <Button onClick={loginClick} className="mt-3" variant="success">
          Log In
        </Button>
      </div>
      <div style={{ marginLeft: "800px" }}>
        <h4>Don't have an Account ?</h4>
        <NavLink to="/signup">
          <Button style={{ marginLeft: "25px" }} variant="info">
            Click Here to Sign Up
          </Button>
        </NavLink>
      </div>
    </>
  );
}


export default Login;
