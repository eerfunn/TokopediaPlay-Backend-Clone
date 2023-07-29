const express = require("express");

const {
  getAllProductsService,
  getProductByIdService,
  insertProductService,
  updateProductService,
  deleteProductService,
} = require("../services/productServices");
const getAllProducts = async (req, res) => {
  try {
    const data = await getAllProductsService();
    if (!data) {
      res.status(200).json({
        message: "Product data is empty",
        status: 200,
      });
    } else {
      res.status(200).json({
        message: "Success Get All Products Data!",
        status: 200,
        data: data,
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

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = await getProductByIdService(productId);
    if (!data) {
      res.status(404).json({
        message: "Product doesn't exist",
        status: 404,
      });
    } else {
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
const insertProduct = async (req, res) => {
  try {
    const { title, photo, price, uid } = req.body;
    if (!uid) {
      throw new Error("Insufficient Parameter UID");
    }
    const data = await insertProductService(title, photo, price, uid);
    res.status(201).json({
      message: "Success Add Product Data!",
      status: 201,
      data: data,
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

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const uid = req.params.uid;
    const { title, photo, price } = req.body;
    const data = await updateProductService(
      productId,
      title,
      photo,
      price,
      uid
    );

    res.status(200).json({
      message: "Data updated!",
      status: 200,
      data: data,
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

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const uid = req.params.uid;
    console.log(productId);
    console.log(uid);
    const data = await deleteProductService(productId, uid);
    res.status(204).json({
      message: "Data deleted!",
      status: 204,
      data: data,
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
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
