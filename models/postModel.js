const { Schema, models, model } = require("mongoose");

const postSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  text: {
    type: String,
  },
  image: {
    type: String,
    // required: [true, "no image selected"],
  },
  images: [
    {
      type: String,
      // required: [true, "no image selected"],
    },
  ],
  videos: [
    {
      type: String,
      // required: [true, "no image selected"],
    },
  ],
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
