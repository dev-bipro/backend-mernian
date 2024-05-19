const haveUser = require("../../helpers/user/haveUser");
const fs = require("fs").promises; // Use fs.promises for promise-based methods
const Post = require("../../models/postModel");

exports.createPost = async (req, res) => {
  console.log(req.files);
  const files = req.files;
  console.log(req.body);
  const { ownerId, text, image } = req.body;
  if (!ownerId) {
    return res.status(404).send({ message: "User not found" });
  }

  const isAccount = await haveUser(ownerId);
  if (!isAccount || isAccount?.error) {
    return res.status(404).send({ message: "User not found" });
  }

  if (!text && !image && files.length <= 0) {
    return res.status(400).send({
      message: "Bad Request",
    });
  }

  let images = files.filter((item) => item.mimetype.split("/")[0] == "image");
  images = images.map((item) => `/${item.path}`);

  let videos = files.filter((item) => item.mimetype.split("/")[0] == "video");
  videos = videos.map((item) => `/${item.path}`);

  if (image) {
    const fileName = `/uploads/post-picture-${Date.now()}.webp`;
    const imageArr = image.split(",");

    try {
      await fs.writeFile("." + fileName, imageArr[1], "base64");
      images.push(fileName);
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        message: "Picture Upload Problem",
      });
    }
  }

  let data = new Post({
    ownerId,
    text,
    images,
    videos,
    types: "post",
  });

  try {
    data = await data.save();
    return res.status(200).send({
      message: "Successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
