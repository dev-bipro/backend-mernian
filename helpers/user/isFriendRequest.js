const FriendRequest = require("../../models/friendRequestModel");

module.exports = async (sender, receiver) => {
  try {
    const data = await FriendRequest.findOne({
      $or: [
        {
          sender,
          receiver,
        },
        {
          sender: receiver,
          receiver: sender,
        },
      ],
    }).populate(
      [
        { path: "sender", select: "-password -verified -otp" }, // Populate another field if necessary
        { path: "receiver", select: "-password -verified -otp" },
      ] // Populate another field if necessary
    );
    return data;
  } catch (error) {
    return { error };
  }
};
