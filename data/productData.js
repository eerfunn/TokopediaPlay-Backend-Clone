const { Product } = require("../db/schema/productSchema");

const getAllProductsData = () => {
  const data = Product.find();
  return data;
};

const getProductByIdData = (productId) => {
  const data = Product.findOne({ productId: productId });
  return data;
};

const productIdCounter = async () => {
  const count = await Product.find().count();
  const pid = "product-" + (count + 1);
  return pid;
};

const insertProductData = async (productId, title, photo, price, user) => {
  try {
    const data = await new Product({
      productId: productId,
      title: title,
      photo: photo,
      price: price,
      added_by: user._id,
      created_at: new Date(),
    }).save();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
const updateProductByIdData = async (productId, title, photo, price) => {
  try {
    const data = await Product.findOneAndUpdate(
      { productId: productId },
      {
        title: title,
        photo: photo,
        price: price,
        updated_at: new Date(),
      },
      { new: true }
    )
      .exec()
      .then((response) => {
        console.log("Data updated: ", response);
        return response;
      });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const deleteProductData = async (productId) => {
  try {
    const data = await Product.deleteOne({ productId: productId });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
module.exports = {
  getAllProductsData,
  getProductByIdData,
  productIdCounter,
  updateProductByIdData,
  insertProductData,
  deleteProductData,
};
