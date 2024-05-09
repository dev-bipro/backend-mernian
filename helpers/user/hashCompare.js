const bcrypt = require("bcrypt");

module.exports = async (hashText,plainText) => {
  const result = await bcrypt.compare(plainText, hashText);
  return result;
};
