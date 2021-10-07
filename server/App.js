const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const App = express();

App.use(cookieParser());

require("./db/Conn");
App.use(express.json());

App.use(require("./router/Auth"));

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
