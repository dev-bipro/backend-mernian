const { Schema, models, model } = require("mongoose");

const postSchema = new Schema({
  name: {
    type: String,
    required: [true, "pleace type your name"],
  },

  ownerId: {
    type: Schema.Types.ObjectId,
  },

  image: {
    type: String,
    required: [true, "no image selected"],
  },
  types: {
    type: String,
    enum: ["profilePic", "coverPic", "post"],
    required: [true, "invalid request"],
  },

  uploadedTime: {
    type: Date,
    default: Date.now(),
  },
});

const Post = models.Post || model("Post", postSchema);

module.exports = Post;
