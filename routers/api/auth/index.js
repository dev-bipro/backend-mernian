const { Router } = require("express");
const { validRequest } = require("../../../middleware/validRequest");
const {
  createUser,
  sendResetPassMail,
  verifyAccount,
  loginUser,
  resetPassword,
  updateProfilePic,
  allUser,
} = require("../../../controllers/auth/userController");
const {
  test,
  imageUpload,
} = require("../../../controllers/auth/testController");

const _ = Router();

_.use("/user", validRequest);
_.route("/user/create").post(createUser).put(verifyAccount);
_.route("/user/login").post(loginUser);
_.route("/user/alluser").get(allUser);
_.route("/user/resetpassword").post(sendResetPassMail).put(resetPassword);
_.route("/user/updateprofileimage").post(updateProfilePic); // check after
_.route("/user/test").post(test); // check after

module.exports = _;
