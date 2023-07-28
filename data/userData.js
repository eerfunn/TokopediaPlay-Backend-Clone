const { User } = require("../db/schema/userSchema");

const getUsersData = async () => {
  const data = await User.find();
  return data;
};

const getUserByIdData = async (userId) => {
  const data = await User.findOne({ userId: userId });
  return data;
};
const checkIsEmailRegistered = async (email) => {
  const data = await User.findOne({ email: email });
  return data;
};

const userIdCounter = async () => {
  const count = await User.find().count();
  const uid = "user-" + (count + 1);
  return uid;
};
const registerUserData = async (uid, email, name, password) => {
  const data = new User({
    userId: uid,
    email: email,
    name: name,
    password: password,
    createdAt: new Date(),
  }).save();
  return data;
};

module.exports = {
  getUsersData,
  getUserByIdData,
  registerUserData,
  checkIsEmailRegistered,
  userIdCounter,
};
