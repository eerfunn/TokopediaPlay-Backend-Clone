const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoId: String,
  videoUID: String,
  userId: String,
  title: String,
  thumbnail: String,
  description: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});
const Video = mongoose.model("video", videoSchema);

module.exports = { Video };
