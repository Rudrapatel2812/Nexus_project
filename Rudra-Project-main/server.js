const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/communityDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
