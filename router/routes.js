const express = require("express");
const { getUsers } = require("../controllers/userController");
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

route.get("/users", getUsers);

module.exports = route;
