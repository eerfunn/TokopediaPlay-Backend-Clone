const { getUserByIdData } = require("../data/userData");
const {
  getAllVideosData,
  getVideoByIdData,
  insertVideoData,
  updateVideoData,
  deleteVideoData,
  videoIdCounter,
} = require("../data/videoData");

const getAllVideosService = async () => {
  try {
    const data = await getAllVideosData();
    return data;
  } catch (error) {
    console.error(error);
    if (error.code) {
      throw error;
    }
    throw new Error(error);
  }
};

const getVideoByIdService = async (videoId) => {
  try {
    const data = await getVideoByIdData(videoId);
    return data;
  } catch (error) {
    console.error(error);
    if (error.code) {
      throw error;
    }
    throw new Error(error);
  }
};

const addVideoService = async (videoId, title, userId, thumbnail, products) => {
  try {
    const vid = await videoIdCounter();
    if (!userId) {
      throw new Error("Insufficient Parameter userId");
    }
    await insertVideoData(vid, userId, title, thumbnail, products);
  } catch (err) {
    console.error(error);
    if (error.code) {
      throw error;
    }
    throw new Error(error);
  }
};

const updateVideoService = async (
  videoId,
  title,
  thumbnail,
  products,
  userId
) => {
  try {
    const user = await getUserByIdData(userId);
    if (!userId) {
      throw new Error("Insufficient Parameter userId");
    }
    console.log("User ID Form: " + userId);
    console.log("User ID DB: " + user.userId);
    if (userId != user.userId) {
      throw new Error("Cannot update data!");
    }
    const data = await updateVideoData(videoId, title, thumbnail, products);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    if (error.code) {
      throw error;
    }
    throw new Error(error);
  }
};

const deleteVideoService = async (videoId, userId) => {
  try {
    const user = await getUserByIdData(userId);
    if (!userId) {
      throw new Error("Insufficient Parameter userId");
    }
    console.log("User ID Form: " + userId);
    console.log("User ID DB: " + user.userId);

    if (userId != user.userId) {
      throw new Error("Cannot delete data!");
    }
    const data = await deleteVideoData(videoId);
    return data;
  } catch (error) {
    console.error(error);
    if (error.code) {
      throw error;
    }
    throw new Error(error);
  }
};
module.exports = {
  getAllVideosService,
  getVideoByIdService,
  addVideoService,
  updateVideoService,
  deleteVideoService,
};
