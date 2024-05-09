const jwt = require("jsonwebtoken");

module.exports = (email) => {
  try {
    const decoded = jwt.verify(email, "shhhhh");
    return decoded;
  } catch (err) {
    // console.log(err);
    return { error: "invalid token" };
    // err
  }
};
