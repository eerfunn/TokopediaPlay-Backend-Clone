const { User } = require("../db/schema/userSchema");

const getUsersData = () => {
  const data = User.find();
  return data;
};
const getUserById = (userId) => {
  const data = User.findOne({ userId: userId });
  return data;
};
const registerUserData = async (uid, email, no_hp, nama, password) => {
  const data = new User({
    userId: uid,
    email: email,
    no_hp: no_hp,
    nama: nama,
    password: password,
    createdAt: new Date(),
  }).save();
  return data;
};

module.exports = {
  getUsersData,
  getUserById,
  registerUserData,
};
