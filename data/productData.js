const { Product } = require("../db/schema/productSchema");
const { User } = require("../db/schema/userSchema");

const getAllProductsData = () => {
  const data = Product.find();
  return data;
};

const getProductByIdData = (productId) => {
  const data = Product.findOne({ productId: productId });
  return data;
};

const insertProductData = (productId, title, photo, price) => {
  try {
    const data = new Product({
      productId: productId,
      title: title,
      photo: photo,
      price: price,
    }).save();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
const updateProductByIdData = async (productId, title, photo, price) => {
  try {
    await Product.updateOne(
      productId,
      {
        title: title,
        photo: photo,
        price: price,
        updated_at: new Date(),
      },
      { new: true }
    )
      .exec()
      .then((res) => {
        console.log("Product Updated!");
      });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  getAllProductsData,
  getProductByIdData,
  updateProductByIdData,
  insertProductData,
};
