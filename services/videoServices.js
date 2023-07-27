const {
  getAllVideosData,
  getVideoById,
  insertVideoData,
  updateVideoData,
  deleteVideoData,
} = require("../data/videoData");

const addVideoService = async (videoId, title, userId, thumbnail, products) => {
  try {
    if (!userId) {
      throw new Error("Insufficient Parameter userId");
    }
    await insertVideoData(videoId, userId, title, thumbnail, products);
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};
module.exports = {
  addVideoService,
};
