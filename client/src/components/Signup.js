import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { NavLink,useHistory } from "react-router-dom";

const SignUp = () => {
  const history=useHistory()
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const signupClick= async(e)=>{
    e.preventDefault();
    const { username, email, password, age, gender } = inputData;
    const res = await fetch("/register",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        username, email, password, age, gender
      })
    })

  
  const data = await res.json();

  if (res.status === 422 || !data) {
    window.alert("Invalid Registration");
    console.log("Invalid Registration");
  } else {
    window.alert(" Registration Successfull");
    console.log("Successfull Registration");
    history.push("/login");
  }
};

 

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
          User Sign Up
        </h3>
        <InputGroup className="mb-3">
          <FormControl
          autoComplete="off"
            placeholder="Username"
            name="username"
            onChange={handleInput}
            value={inputData.name}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
          autoComplete="off"
            placeholder="Email"
            name="email"
            onChange={handleInput}
            value={inputData.email}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
          autoComplete="off"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={inputData.password}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
          autoComplete="off"
            type="number"
            placeholder="Age"
            name="age"
            onChange={handleInput}
            value={inputData.age}
          />
        </InputGroup>
        <input
          style={{ marginRight: "10px" }}
          type="radio"
          name="gender"
          value="Male"
          onChange={handleInput}
        />
        <label>Male</label>
        <input
          style={{ marginLeft: "20px" }}
          type="radio"
          name="gender"
          value="Female"
          onChange={handleInput}
        />
        <label style={{ marginLeft: "10px" }}>Female</label>
        <div>
          <Button onClick={signupClick} className="mt-3" variant="primary">
            Sign Up
          </Button>
        </div>
      </div>
      <div style={{ marginLeft: "800px" }}>
        <h4>Already Registered ?</h4>
        <NavLink to="/login">
          <Button style={{ marginLeft: "25px" }} variant="success">
            Click Here to Log In
          </Button>
        </NavLink>
      </div>
    </>
  );
 }
export default SignUp;
