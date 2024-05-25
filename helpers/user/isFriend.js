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
    }).populate(
      [
        { path: "userOne", select: "-password -verified -otp" }, // Populate another field if necessary
        { path: "userTwo", select: "-password -verified -otp" },
      ] // Populate another field if necessary
    );
    return data;
  } catch (error) {
      console.log(error)
    return { error };
  }
};
