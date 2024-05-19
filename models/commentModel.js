const { Schema, models, model, Types } = require("mongoose");

const commentSchema = new Schema({
  ownerId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Types.ObjectId,
    ref: "Post",
    required: true,
  },

  types: {
    type: String,
    enum: ["like", "love", "wow", "engry", "hahaha"],
    required: [true, "invalid request"],
  },

  uploadedTime: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = models.React || model("Comment", commentSchema);

module.exports = Comment;
