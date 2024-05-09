const jwt = require("jsonwebtoken");

module.exports = (email) => {
  const token = jwt.sign({ email }, "shhhhh");

  return token;
};
