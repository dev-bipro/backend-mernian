const { Schema, models, model } = require("mongoose");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const sendMail = require("../helpers/user/sendMail");
const emailToken = require("../helpers/user/emailToken");
const hashSync = require("../helpers/user/hashSync");
// const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "pleace type your name"],
  },
  email: {
    type: String,
    required: [true, "please type your email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "please type your password"],
    minlength: [4, "please type min 4 char"],
    maxlength: [16, "please type max 16 char"],
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return this.password == el;
      },
      message: "check your confirm password",
    },
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "unknowon gender",
    },
    required: [true, "pleace select your gender"],
  },
  profilePicAvatar: {
    type: String,
    default: function () {
      if (this.gender === "male") {
        return "https://i.pinimg.com/564x/0e/9b/ce/0e9bceffda12d948ebe741b5b25dcc16.jpg";
      } else if (this.gender === "female") {
        return "https://cdn.pixabay.com/photo/2020/11/29/01/25/woman-5786062_1280.png";
      } else {
        return "https://media.istockphoto.com/id/1350997788/vector/transgender-and-gender-symbol-woman-man-diverse.jpg?s=612x612&w=0&k=20&c=gSzZfBpZ9FfH9N-Scy4qBeVXtckT3DgZzXs9_tLaHd4=";
      }
    },
  },
  profilePic: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  coverPic: {
    type: String,
    default:
      "https://timelinecovers.pro/facebook-cover/download/Avatar-eye-facebook-cover.jpg",
  },
  about: {
    type: Schema.Types.ObjectId,
    ref: "About",
  },
  otp: String,
  verified: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.password != this.confirmPassword) {
    // throw new Error("check your confirm password");
    next(new Error("check your confirm password"));
  } else {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    this.otp = otp;

    if (!this.isModified("password")) {
      return next();
    } else {
      const hash = hashSync(this.password);
      this.password = hash;
      this.confirmPassword = undefined;

      next();
    }
  }
  // console.log("ami pre hooks", data);
});

userSchema.post("save", async function (doc, next) {
  // setTimeout(() => {
  //   User.findOneAndUpdate(
  //     { email: doc.email },
  //     {
  //       // $set: {
  //       otp: "",
  //       // },
  //     }
  //   );
  // }, 10000);

  const email = await emailToken(doc.email);
  console.log(email);

  const template = `<h2>please verify your email</h2></br><a href=${`http://localhost:5173/verify/${email}`}>click to verify</a>`;
  try {
    // Wait for 10 seconds
    await sendMail(doc.email, template);
    next();
  } catch (error) {
    console.error("Error while clearing OTP:", error);
    next(new Error("check your confirm password"));
  }
});

const User = models.User || model("User", userSchema);

module.exports = User;
