const express = require("express");
const { registerUserData } = require("../data/userData");

const usersArray = [
  {
    id: "001",
    name: "Achmiedes",
    password: "password",
  },
  {
    id: "002",
    name: "Vallen",
    password: "password",
  },
  {
    id: "003",
    name: "Hades",
    password: "password",
  },
];

const getUsers = (req, res) => {
  try {
    res.status(200).json({
      message: "Success Get All Users!",
      status: 200,
      data: usersArray,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
};
const getUserById = (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      res.status(404).json({
        message: "Insufficient Parameters",
        status: 404,
      });
    }
    res.status(200).json({
      message: "Success Get User Data",
      status: 200,
      data: usersArray[id],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { uid, email, no_hp, nama, password } = req.body;
    const data = await registerUserData(uid, email, no_hp, nama, password);

    res.status(201).json({
      message: "Success Add User!",
      status: 201,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
};
module.exports = { getUsers, getUserById, addUser };
