const {
  getAllProductsData,
  getProductByIdData,
  insertProductData,
  updateProductByIdData,
  deleteProductData,
} = require("../data/productData");
const { getUserById } = require("../data/userData");

const getAllProductsService = async () => {
  try {
    const data = await getAllProductsData();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getProductByIdService = async (productId) => {
  try {
    const data = await getProductByIdData(productId);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const insertProductService = async (productId, title, photo, price, uid) => {
  try {
    const user = await getUserById(uid);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const data = await insertProductData(
      productId,
      title,
      photo,
      price,
      user._id
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const updateProductService = async (productId, title, photo, price, uid) => {
  try {
    const user = await getUserById(uid);
    if (!user) {
      throw new Error("Unauthorized");
    }
    console.log("User ID Form: " + uid);
    console.log("User ID DB: " + user.userId);

    if (uid != user.userId) {
      throw new Error("Unauthorized!");
    }
    const data = await updateProductByIdData(productId, title, photo, price);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const deleteProductService = async (productId, userId) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("Unauthorized");
    }
    console.log("User ID Form: " + userId);
    console.log("User ID DB: " + user.userId);

    if (userId != user.userId) {
      throw new Error("Unauthorized!");
    }
    const data = await deleteProductData(productId);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  insertProductService,
  updateProductService,
  deleteProductService,
};
