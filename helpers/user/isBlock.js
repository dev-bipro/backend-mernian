const Block = require("../../models/blockUserModel");

module.exports = async (blockBy, blockTo) => {
  try {
    const data = await Block.findOne({
      $or: [
        {
          blockBy,
          blockTo,
        },
        {
          blockBy: blockTo,
          blockTo: blockBy,
        },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};
