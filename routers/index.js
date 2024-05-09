const { Router } = require("express");
const route = require("./api");

const _ = Router();

_.use(process.env.BASE_URL, route);

_.use("/", (req, res) => {
  return res.status(401).send({
    message: "unauthorize port",
  });
});

module.exports = _;
