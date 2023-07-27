const express = require("express");
const { insertProductData } = require("../data/productData");

const addProduct = async (req, res) => {
  try {
    const { productId, title, photo, price, uid } = req.body;
    if (!uid) {
      throw new Error("Insufficient Parameter UID");
    }
    const data = await insertProductData(productId, title, photo, price, uid);
    res.status(201).json({
      message: "Success Add Product Data!",
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

module.exports = {
  addProduct,
};
