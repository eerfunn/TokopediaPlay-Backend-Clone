const express = require("express");
const { getUsers, addUser } = require("../controllers/userController");
const { addVideo } = require("../controllers/videoController");
const { addProduct } = require("../controllers/productController");

const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

route.get("/users", getUsers);
route.post("/addVideo", addVideo);
route.post("/addUser", addUser);
route.post("/addProduct", addProduct);

module.exports = route;
