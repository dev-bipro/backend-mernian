const User = require("../../models/userModel");

module.exports = async (email) => {
  const data = await User.findOne({ email });
  return data;
};
