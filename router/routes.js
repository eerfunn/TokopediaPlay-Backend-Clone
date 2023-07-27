const express = require("express");
const { getUsers, addUser } = require("../controllers/userController");
const {
  addVideo,
  updateVideo,
  getVideos,
  getVideoById,
  deleteVideo,
} = require("../controllers/videoController");
const { addProduct } = require("../controllers/productController");
const { updateProductByIdData } = require("../data/productData");

const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

route.get("/users", getUsers);
route.post("/addUser", addUser);

route.post("/addProduct", addProduct);
route.post("/updateProduct", updateProductByIdData);

route.get("/videos", getVideos);
route.get("/video/:id", getVideoById);
route.post("/addVideo", addVideo);
route.put("/updateVideo", updateVideo);
route.delete("/video/:id/delete/:uid", deleteVideo);

module.exports = route;
