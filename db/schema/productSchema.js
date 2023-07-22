const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: String,
  title: String,
  photo: String,
  url: String,
  price: Number,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});
const Product = mongoose.model("product", productSchema);

module.exports = { Product };
