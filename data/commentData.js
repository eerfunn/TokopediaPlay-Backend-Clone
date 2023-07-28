const { Comment } = require("../db/schema/commentSchema");

const getComments = async () => {
  const data = await Comment.find();
  return data;
};

const getCommentById = async (commentId) => {
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
