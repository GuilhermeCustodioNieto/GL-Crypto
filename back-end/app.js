const express = require("express");
const connection = require("./models/connection");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.listen(3000, () => {
  console.log("App rodando em http://localhost:3000");
});
