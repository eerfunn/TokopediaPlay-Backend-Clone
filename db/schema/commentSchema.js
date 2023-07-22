const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentId: String,
  videoId: [
    {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
  ],
  email: String,
  content: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});
const Comment = mongoose.model("comment", commentSchema);

module.exports = { Comment };
