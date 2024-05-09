const User = require("../../models/userModel");

module.exports = async (ownerId) => {
  try {
    const data = await User.findById(ownerId);
    return data;
  } catch (error) {
    return { error };
  }
};
