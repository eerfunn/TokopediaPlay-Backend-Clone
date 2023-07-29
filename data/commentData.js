const { Comment } = require("../db/schema/commentSchema");

const getAllCommentsData = async () => {
  const data = await Comment.find();
  return data;
};

const getCommentByIdData = async (commentId) => {
  const data = await Comment.findOne({ commentId: commentId });
  return data;
};

const commentIdCounter = async () => {
  const count = await Comment.find().count();
  const cid = "comment-" + (count + 1);
  return cid;
};

const insertCommentData = async (cid, vid, uid, content) => {
  const data = new Comment({
    commentId: cid,
    videoId: vid,
    userId: uid,
    content: content,
    created_at: new Date(),
  }).save();
  return data;
};

const updateCommentData = async (cid, content) => {
  try {
    const data = await Comment.findOneAndUpdate(
      { commentId: cid },
      {
        content: content,
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

const deleteCommentData = async (commentId) => {
  try {
    const data = await Comment.deleteOne({ commentId: commentId });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
module.exports = {
  getAllCommentsData,
  getCommentByIdData,
  commentIdCounter,
  insertCommentData,
  updateCommentData,
  deleteCommentData,
};
