const {
  getAllCommentsService,
  getCommentByIdService,
  insertCommentService,
  updateCommentService,
  deleteCommentService,
} = require("../services/commentService");

const getAllComments = async (req, res) => {
  try {
    const data = await getAllCommentsService();
    res.status(200).json({
      status: 200,
      message: "Success get all comments!",
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

const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Bad request, input is not valid or insufficient parameters",
      });
    }
    const data = await getCommentByIdService(id);
    res.status(200).json({
      status: 200,
      message: "Success get comment!",
      data: data,
    });
  } catch (error) {
    console.log(error.code);
    if (error.code) {
      return res.status(error.code).json({
        status: error.code,
        message: error.message,
        error: error.stack,
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Something went wrong!",
      error: error.stack,
    });
  }
};

const insertComment = async (req, res) => {
  try {
    const { vid, uid, content } = req.body;
    if (!vid || !uid || !content) {
      return res.status(400).json({
        status: 400,
        message: "Bad request, input is not valid or insufficient parameters!",
      });
    }
    const data = await insertCommentService(vid, uid, content);
    res.status(200).json({
      status: 200,
      message: "Success add new comment!",
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
const updateComment = async (req, res) => {
  try {
    const { id, uid } = req.params;
    const { content } = req.body;
    if (!id || !uid || !content) {
      return res.status(400).json({
        status: 400,
        message: "Bad request, input is not valid or insufficient parameters!",
      });
    }
    const data = await updateCommentService(id, uid, content);
    res.status(200).json({
      status: 200,
      message: "Success update comment!",
      data: data,
    });
  } catch (error) {
    console.log("COntroller:" + error.code);
    if (error.code) {
      console.log(error.code);
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
const deleteComment = async (req, res) => {
  try {
    const { id, cid } = req.params.id;
    if (!id || !cid) {
      return res.status(400).json({
        status: 400,
        message: "Bad request, input is not valid or insufficient parameters",
      });
    }
    const data = await deleteCommentService(id, cid);
    res.status(200).json({
      status: 200,
      message: "Success delete comment!",
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
  getAllComments,
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
};
