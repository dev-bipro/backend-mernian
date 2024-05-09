const { Router } = require("express");
const authRoute = require("./auth");

const _ = Router();

_.use("/auth", authRoute);

module.exports = _;
