const express = require("express");
const {
  getUsers,
  getUserById,
  whoAmI,
  register,
  login,
  logout,
} = require("../controllers/userController");
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
const {
  getAllComments,
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
  getCommentByVideo,
} = require("../controllers/commentController");
const { verifyToken } = require("../middleware/authMiddleware");
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

route.get("/users", getUsers);
route.get("/user/:id", getUserById);
route.get("/whoami", whoAmI);
route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

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

route.get("/comments", getAllComments);
route.get("/video/:vidid/comments", getCommentByVideo);
route.get("/comment/:id", getCommentById);
route.post("/comment/add", insertComment);
route.put("/comment/:id/update/:uid", updateComment);
route.delete("/comment/:id/delete/:uid", deleteComment);

module.exports = route;
