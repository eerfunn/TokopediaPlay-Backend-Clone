const {
  getAllCommentsData,
  getCommentByIdData,
  commentIdCounter,
  insertCommentData,
  updateCommentData,
  deleteCommentData,
} = require("../data/commentData");
const { getVideoByIdData } = require("../data/videoData");
const { getUserByIdData } = require("../data/userData");
const { errorTemplate } = require("../services/errorService");

const getAllCommentsService = async () => {
  try {
    const data = await getAllCommentsData();
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};

const getCommentByIdService = async (commentId) => {
  try {
    const data = await getCommentByIdData(commentId);
    if (!data) {
      return errorTemplate(404, "Data doesn't exist!");
    }
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};

const insertCommentService = async (vid, uid, content) => {
  try {
    const commentId = await commentIdCounter();
    const videoId = await getVideoByIdData(vid);
    const userId = await getUserByIdData(uid);
    if (!videoId || !userId || !content) {
      return errorTemplate(400, "Bad Request, input data is not valid");
    }
    const data = await insertCommentData(
      commentId,
      videoId._id,
      userId._id,
      content
    );
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};
const updateCommentService = async (cid, uid, content) => {
  try {
    const commentId = await getCommentByIdData(cid);
    const userId = await getUserByIdData(uid);
    if (!commentId || !userId || !content) {
      return errorTemplate(400, "Bad Request, input data is not valid");
    }
    if (commentId.userId != userId._id) {
      return errorTemplate(
        403,
        "I'm sorry, you don't have the right permission for this resource"
      );
    }
    const data = await updateCommentData(commentId, content);
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};
const deleteCommentService = async (uid, cid) => {
  try {
    const commentId = await getCommentByIdData(cid);
    const userId = await getUserByIdData(uid);
    if (!commentId || !userId) {
      return errorTemplate(400, "Bad Request, input data is not valid");
    }
    if (commentId.userId != userId._id) {
      return errorTemplate(
        403,
        "I'm sorry, you don't have the right permission for this resource"
      );
    }
    const data = await deleteCommentData(cid);
    return data;
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw new Error(error);
  }
};
module.exports = {
  getAllCommentsService,
  getCommentByIdService,
  insertCommentService,
  updateCommentService,
  deleteCommentService,
};
