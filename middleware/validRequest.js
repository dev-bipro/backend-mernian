exports.validRequest = (req, res, next) => {
  // console.log(req.headers);
  if (req.headers?.authorization != process.env.VALID_REQUEST) {
    return res.status(401).send({
      message: "bad requiest",
    });
  }
  next();
};
