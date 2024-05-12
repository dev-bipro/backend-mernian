const multer = require("multer");
const path = require("path");
var fs = require("fs");

// const imageStorage = multer.diskStorage({
//   // Destination to store image
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now());
//     // file.fieldname is name of the field (image)
//     // path.extname get the uploaded file extension
//   },
// });

// exports.imageUpload = multer({
//   storage: imageStorage,
//   limits: {
//     fileSize: 1000000, // 1000000 Bytes = 1 MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg)$/)) {
//       // upload only png and jpg format
//       return cb(new Error("Please upload a Image"));
//     }
//     cb(undefined, true);
//   },
// });

exports.test = (req, res) => {
  //   console.log(req.body.image);
  const { image } = req.body;
  //   const ext = "jpeg";
  const fileName = "image-ami.webp";

  if (image) {
    const arr = image.split(",");

    fs.writeFile("./uploads/" + fileName, arr[1], "base64", function (err) {
      if (err) {
        // console.log(err);
      } else {
        console.log("awesome");
      }
    });
  }

  //   res.send(req.file);
};
