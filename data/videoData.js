const { Video } = require("../db/schema/videoSchema");
const { getProductByIdData } = require("../data/productData");

const getAllVideosData = () => {
  const data = Video.find().populate("products comments");
  return data;
};

const getVideoByIdData = (videoId) => {
  const data = Video.findOne({ videoId: videoId });
  return data;
};
const videoIdCounter = async () => {
  const count = await Video.find().count();
  const vid = "video-" + (count + 1);
  return vid;
};
const insertVideoData = async (videoId, userId, title, thumbnail, products) => {
  try {
    let prodArr = [];
    let badData = 0;
    for (let i of products) {
      const product = await getProductByIdData(i);
      if (!product) {
        badData++;
      } else {
        prodArr.push(product._id);
      }
    }
    console.log("Success: " + prodArr);
    console.log("Fail: " + badData);
    const data = new Video({
      videoId: videoId,
      title: title,
      userId: userId,
      thumbnail: thumbnail,
      products: prodArr,
      created_at: new Date(),
    }).save();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const updateVideoData = async (videoId, title, thumbnail, products) => {
  try {
    let prodArr = [];
    for (let i of products) {
      const product = await getProductByIdData(i);
      prodArr.push(product._id);
    }
    const data = await Video.findOneAndUpdate(
      { videoId: videoId },
      {
        videoId: videoId,
        title: title,
        thumbnail: thumbnail,
        products: prodArr,
        updated_at: new Date(),
      },
      { new: true }
    )
      .exec()
      .then((response) => {
        console.log("Data updated: ", response);
        return response;
      });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const updateVideoCommentData = async (videoId, commentId) => {
  try {
    const video = await getVideoByIdData(videoId);
    console.log(video);
    const data = await Video.findOneAndUpdate(
      { videoId: videoId },
      {
        comments: [...video.comments, commentId],
        updated_at: new Date(),
      },
      { new: true }
    )
      .exec()
      .then((response) => {
        console.log("Data updated: ", response);
        return response;
      });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const deleteVideoData = (videoId) => {
  try {
    const data = Video.deleteOne({ videoId: videoId });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
module.exports = {
  getAllVideosData,
  getVideoByIdData,
  insertVideoData,
  updateVideoData,
  deleteVideoData,
  videoIdCounter,
  updateVideoCommentData,
};
