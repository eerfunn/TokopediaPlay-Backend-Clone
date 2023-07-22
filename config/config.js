const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const DBConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Conected!");
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

module.exports = {
  DBConnect,
};
