const { Schema, models, model, Types } = require("mongoose");

const reactSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
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

const React = models.React || model("React", reactSchema);

module.exports = React;
