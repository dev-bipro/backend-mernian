const Friend = require("../../models/friendModel");

module.exports = async (userOne, userTwo) => {
  try {
    const data = await Friend.findOne({
      $or: [
        {
          userOne,
          userTwo,
        },
        {
          userOne: userTwo,
          userTwo: userOne,
        },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};
