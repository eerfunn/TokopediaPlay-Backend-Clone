const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: String,
  title: String,
  photo: String,
  price: Number,
  added_by: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});
const Product = mongoose.model("product", productSchema);

module.exports = { Product };
