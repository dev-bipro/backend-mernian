const { Router } = require("express");
const { validRequest } = require("../../../middleware/validRequest");
const multer = require("multer");
const { multipleImageStorage } = require("../../../helpers/multer");
const { createPost } = require("../../../controllers/post/postController");

const _ = Router();

_.use("/", validRequest);
_.route("/create").post(
  multer({ storage: multipleImageStorage }).array("images", 12),
  createPost
);

module.exports = _;
