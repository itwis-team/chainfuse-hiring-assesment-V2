const cors = require("cors");
const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  
  app.use("/api", router);
  
  app.listen(8000, () => {
    console.log("Server started at port 8000");
  });
});
