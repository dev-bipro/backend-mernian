const { Router } = require("express");
const authRoute = require("./auth");
const postRoute = require("./post");

const _ = Router();

_.use("/auth", authRoute);
_.use("/post", postRoute);

module.exports = _;
