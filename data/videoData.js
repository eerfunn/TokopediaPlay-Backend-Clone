const { Video } = require("../db/schema/videoSchema");
const { getProductByIdData } = require("../data/productData");

const getAllVideosData = () => {
  const data = Video.find();
  return data;
};

const getVideoByIdData = (videoId) => {
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
};
