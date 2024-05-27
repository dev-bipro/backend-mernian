const { Schema, models, model, Types } = require("mongoose");

const blockUserSchema = new Schema({
  blockBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  blockTo: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  blockTime: {
    type: Date,
    default: Date.now(),
  },
});

const Block = models.Block || model("Block", blockUserSchema);

module.exports = Block;
