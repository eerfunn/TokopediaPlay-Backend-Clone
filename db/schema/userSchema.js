const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  email: String,
  no_hp: String,
  password: String,
  name: String,
  photo: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});
const User = mongoose.model("user", userSchema);

module.exports = { User };
