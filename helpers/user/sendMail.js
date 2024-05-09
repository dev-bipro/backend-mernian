const nodemailer = require("nodemailer");
module.exports = async (email, template) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "roh17ra@gmail.com",
      pass: "iehg ujwq ewyv hthb",
    },
  });
  const info = await transporter.sendMail({
    from: "roh17ra@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Please Verify", // Subject line
    html: template, // html body
  });
};
