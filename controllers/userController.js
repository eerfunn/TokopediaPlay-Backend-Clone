const express = require("express");
const {
  getUsersService,
  getUserByIdService,
  registerUserService,
  loginUserService,
} = require("../services/userServices");
const { whoAmIService } = require("../services/authServices");

const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    res.status(200);
    return res.json({
      message: "Success get all users",
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    res.status(500);
    return res.json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await getUserByIdService(userId);
    if (!users) {
      res.status(404);
      return res.json({
        message: "User does not exist",
        statusCode: 404,
      });
    } else {
      res.status(200);
      return res.json({
        message: "Success get user",
        statusCode: 200,
        data: users,
      });
    }
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    res.status(500);
    return res.json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      return res.json({ status: 400, message: "Data cannot be empty!" });
    }
    const user = await registerUserService(name, email, password);
    res.status(201);
    return res.json({
      message: "Register success!",
      statusCode: 201,
      data: user,
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    res.status(500);
    return res.json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginUserService(req, res);
    console.log("User: " + user);
    res.status(200).json({
      statusCode: 200,
      message: "Login success!",
      accessToken: user,
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    res.status(500);
    return res.json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

const whoAmI = async (req, res) => {
  try {
    const who = await whoAmIService(req, res);
    return res.status(200).json({
      status: 200,
      data: who,
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    res.status(500);
    return res.json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

const logout = async (req, res) => {
  try {
    if (!req.headers.cookie) {
      return res.sendStatus(204);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200);
    return res.json({
      statusCode: 200,
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    res.status(500);
    return res.json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  whoAmI,
  register,
  login,
  logout,
};
