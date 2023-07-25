const User = require("../db/schema/User");

const getUsersData = () => {
  const data = User.find();
  return data;
};
const getUserById = (userId) => {
  const data = User.findOne({ userId: userId });
  return data;
};
const registerUserData = (email, no_hp, nama, password) => {
  const data = new User({
    email: email,
    no_hp: no_hp,
    nama: nama,
    password: password,
  }).save();
  return data;
};

module.exports = {
  getUsersData,
  getUserById,
  registerUserData,
};
