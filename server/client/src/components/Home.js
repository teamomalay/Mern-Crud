import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const [userName,setUserName]=useState("");
  const [showBtn,setShowBtn]=useState(true);

   useEffect(() => {
     callHomePage();
   }, []);

  const callHomePage= async ()=>{
    const res= await fetch ("/home",{
            method:"GET",
            headers:{
              "Accept":"application/json",
              "Content-Type" :"application/json"
            } 
    })
    const data=await res.json();
    setUserName(data.username);
    setShowBtn(false);
  }

  return (
    <div>
      <div
        className="container-mt-5 text-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Welcome {userName}</h1>
        <NavLink to="/signup">
        {
          showBtn===true ?  <Button variant="info">Click Here to Sign Up</Button> : null
        }
         
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
