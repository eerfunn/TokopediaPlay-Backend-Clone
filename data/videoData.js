const { Video } = require("../db/schema/videoSchema");
const { getUserById } = require("../data/userData");
const { getProductByIdData } = require("../data/productData");
const getAllVideosData = () => {
  const data = Video.find();
  return data;
};

const getVideoById = (videoId) => {
  const data = Video.findOne({ videoId: videoId });
  return data;
};

const insertVideoData = async (videoId, userId, title, thumbnail, products) => {
  try {
    let prodArr = [];
    for (let i of products) {
      const product = await getProductByIdData(i);
      prodArr.push(product._id);
    }
    console.log("ARR:" + prodArr);
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

const updateVideoData = (videoId, userId, title, thumbnail, products) => {
  try {
    const data = Video.findOneAndUpdate(
      { videoId: videoId },
      {
        videoId: videoId,
        title: title,
        userId: userId,
        thumbnail: thumbnail,
        products: products,
        updated_at: new Date(),
      },
      { new: true }
    ).save();
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
  getVideoById,
  insertVideoData,
  updateVideoData,
  deleteVideoData,
};
