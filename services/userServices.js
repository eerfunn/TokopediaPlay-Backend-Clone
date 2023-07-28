const bcrypt = require("bcrypt");
const {
  getUsersData,
  getUserByIdData,
  registerUserData,
  checkIsEmailRegistered,
  userIdCounter,
} = require("../data/userData");
const { signToken } = require("../services/authServices");

const { errorTemplate } = require("../services/errorService");

const getUsersService = async () => {
  const data = await getUsersData();
  return data;
};
const getUserByIdService = async (userId) => {
  if (!userId) {
    throw new Error("Insufficient Parameter UserId");
  }
  const data = await getUserByIdData(userId);
  return data;
};

const registerUserService = async (name, email, password) => {
  const isEmailRegistered = await checkIsEmailRegistered(email);
  console.log(isEmailRegistered);
  if (isEmailRegistered) {
    return errorTemplate(409, "Email already registered!");
  }
  const uid = await userIdCounter();
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await registerUserData(uid, email, name, hashPassword);
  return user;
};

const loginUserService = async (req, res) => {
  const user = await checkIsEmailRegistered(req.body.email);
  console.log(user);
  console.log(req.body.password);
  if (!user) {
    return errorTemplate(404, "Email is not registered!");
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return errorTemplate(401, "Username or password is incorrect!");
  }
  req.user = {
    id: user.userId,
    email: user.email,
    name: user.name,
  };

  const token = await signToken(req, res);
  return token;
};

module.exports = {
  getUsersService,
  getUserByIdService,
  registerUserService,
  loginUserService,
};
