const express = require("express");
const { getUsers, addUser } = require("../controllers/userController");
const {
  addVideo,
  updateVideo,
  getVideos,
  getVideoById,
  deleteVideo,
} = require("../controllers/videoController");
const {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

route.get("/users", getUsers);
route.post("/addUser", addUser);

route.get("/products", getAllProducts);
route.get("/product/:id", getProductById);
route.post("/product/add", insertProduct);
route.put("/product/:id/update/:uid", updateProduct);
route.delete("/product/:id/delete/:uid", deleteProduct);

route.get("/videos", getVideos);
route.get("/video/:id", getVideoById);
route.post("/video/add", addVideo);
route.put("/video/:id/update/:uid", updateVideo);
route.delete("/video/:id/delete/:uid", deleteVideo);

module.exports = route;
