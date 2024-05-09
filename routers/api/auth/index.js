const { Router } = require("express");
const { validRequest } = require("../../../middleware/validRequest");
const {
  createUser,
  sendResetPassMail,
  verifyAccount,
  loginUser,
  resetPassword,
  updateProfilePic,
} = require("../../../controllers/auth/userController");

const _ = Router();

_.use("/user", validRequest);
_.route("/user/create").post(createUser).put(verifyAccount);
_.route("/user/login").post(loginUser).put(verifyAccount); //check after
_.route("/user/resetpassword").post(sendResetPassMail).put(resetPassword);
_.route("/user/updateprofileimage").post(updateProfilePic).put(resetPassword); // check after

module.exports = _;
