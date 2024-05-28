const Block = require("../../models/blockUserModel");

module.exports = async (loginuser) => {
  try {
    const data = await Block.find({
      $or: [
        {
          blockBy: loginuser,
        },
        {
          blockTo: loginuser,
        },
      ],
    });
    console.log(data);
    result = data.map((item) => {
      if (item.blockBy == loginuser) {
        return item.blockTo;
      } else {
        return item.blockBy;
      }
    });
    return result;
  } catch (error) {
    return { error };
  }
};
