const express = require("express");
const {
  getAllVideosService,
  getVideoByIdService,
  addVideoService,
  updateVideoService,
  deleteVideoService,
} = require("../services/videoServices");

const getVideos = async (req, res) => {
  try {
    const data = await getAllVideosService();

    if (!data) {
      res.status(200).json({
        message: "Video data is empty",
        status: 200,
      });
    } else {
      res.status(200).json({
        message: "Success Get All Videos Data!",
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
const getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const data = await getVideoByIdService(videoId);
    if (!data) {
      res.status(404).json({
        message: "Data not found!",
        status: 404,
      });
    } else {
      res.status(200).json({
        message: "Success Get Video Data!",
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

const updateVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const uid = req.params.uid;
    const { title, thumbnail, products } = req.body;
    const data = await updateVideoService(
      videoId,
      title,
      thumbnail,
      products,
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

const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const uid = req.params.uid;
    console.log(videoId);
    console.log(uid);
    const data = await deleteVideoService(videoId, uid);
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
  getVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
};
