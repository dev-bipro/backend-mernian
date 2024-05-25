const { Schema, models, model, Types } = require("mongoose");

const FriendRequestSchema = new Schema({
  sender: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  sendTime: {
    type: Date,
    default: Date.now(),
  },
});

const FriendRequest =
  models.Friendrequest || model("Friendrequest", FriendRequestSchema);

module.exports = FriendRequest;
