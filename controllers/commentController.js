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
    const { id } = req.params.id;
    const data = await getCommentByIdService(id);
    res.status(200).json({
      status: 200,
      message: "Success comment data!",
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
