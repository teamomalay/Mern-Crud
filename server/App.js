const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})

const express=require("express");
const mongoose=require("mongoose");
const App=express();

require("./db/Conn");
App.use(express.json());

App.use(require("./router/Auth"));

const PORT=process.env.PORT || 5000

App.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})