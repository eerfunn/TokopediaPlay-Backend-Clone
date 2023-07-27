const express = require("express");
const { addVideoService } = require("../services/videoServices");
const videoArray = [
  {
    id: "v001",
    title: "Blindr",
    userId: "001",
  },
  {
    id: "v002",
    title: "Nvidia 4090Ti",
    userId: "002",
  },
  {
    id: "v003",
    title: "New Shoes",
    userId: "003",
  },
];
const getVideos = (req, res) => {
  try {
    res.status(200).json({
      message: "Success Get All Videos Data!",
      status: 200,
      data: videoArray,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
};
const getVideoById = (req, res) => {
  try {
    const { id } = req.params.id;
    res.status(200).json({
      message: "Success Get Video Data!",
      status: 200,
      data: videoArray[id],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

const addVideo = async (req, res) => {
  try {
    const { videoId, title, userId, thumbnail, products } = req.body;
    const data = await addVideoService(
      videoId,
      title,
      userId,
      thumbnail,
      products
    );
    res.status(201).json({
      message: "New Video Added!",
      status: 201,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};
module.exports = {
  getVideos,
  getVideoById,
  addVideo,
};
