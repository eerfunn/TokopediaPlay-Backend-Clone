const { Product } = require("../db/schema/productSchema");
const { User } = require("../db/schema/userSchema");
const { getUserById } = require("../data/userData");

const getAllProductsData = () => {
  const data = Product.find();
  return data;
};

const getProductByIdData = (productId) => {
  const data = Product.findOne({ productId: productId });
  return data;
};

const insertProductData = async (productId, title, photo, price, uid) => {
  try {
    const user = await getUserById(uid);
    if (!user) {
      throw new Error("User did not exist");
    }
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
