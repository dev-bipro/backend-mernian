const { hashSync } = require("bcrypt");

module.exports = (plainText) => {
  const hash = hashSync(plainText, 10);
  return hash;
};
