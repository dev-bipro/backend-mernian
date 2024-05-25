const { Schema, models, model, Types } = require("mongoose");

const FriendSchema = new Schema({
  userOne: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  userTwo: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  friendTime: {
    type: Date,
    default: Date.now(),
  },
});

const Friend = models.Friend || model("Friend", FriendSchema);

module.exports = Friend;
