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
  try {
    const data = await getUsersData();
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};
const getUserByIdService = async (userId) => {
  try {
    if (!userId) {
      return errorTemplate(400, "Insufficient Parameter UserId");
    }
    const data = await getUserByIdData(userId);
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};

const registerUserService = async (name, email, password) => {
  try {
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
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};

const loginUserService = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};

module.exports = {
  getUsersService,
  getUserByIdService,
  registerUserService,
  loginUserService,
};
