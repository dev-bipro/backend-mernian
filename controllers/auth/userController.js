const decodedEmail = require("../../helpers/user/decodedEmail");
const emailToken = require("../../helpers/user/emailToken");
const hashCompare = require("../../helpers/user/hashCompare");
const hashSync = require("../../helpers/user/hashSync");
const haveAccount = require("../../helpers/user/haveAccount");
const haveUser = require("../../helpers/user/haveUser");
const {
  checkRegInp,
  loginInputsCheck,
  validEmail,
  checkEmailInput,
  emailOtpInpCheck,
  resetPasswordInput,
  profilePicInputs,
} = require("../../helpers/user/inputsValidetor");
const sendMail = require("../../helpers/user/sendMail");
const Post = require("../../models/postModel");
const User = require("../../models/userModel");
const otpGenerator = require("otp-generator");
const fs = require("fs");

exports.createUser = async (req, res) => {
  // res.send("ami create user");
  const { name, email, password, confirmPassword, gender } = req.body;
  // console.log(email);

  // console.log({
  //   name,
  //   email,
  //   password,
  //   passwordConfrim,
  //   gender,
  // });
  const inputCheck = checkRegInp(
    name,
    email,
    password,
    confirmPassword,
    gender
  );
  // console.log(inputCheck);

  if (inputCheck) {
    return res.status(400).send({
      ...inputCheck,
    });
  } else {
    const isAccount = await haveAccount(email);
    // console.log("ami", isAccount);
    if (isAccount) {
      return res.status(409).send({
        message: "You Have Already An Account",
      });
    } else {
      let data = new User(req.body);
      try {
        data = await data.save();
        data = data.toObject();
        delete data.password;
        delete data.otp;
        setTimeout(async () => {
          await User.findOneAndUpdate(
            { email: data.email },
            {
              // $set: {
              otp: "",
              // },
            }
          );
        }, 300000);
        return res
          .status(200)
          .send({ message: "Registration Successfull", data });
      } catch (error) {
        console.log("err", error);
        // const err = JSON.parse(error);
        // console.log(err);

        return res.status(500).send({
          message: "bad request",
          // error: err.Error,
        });
        // return res.send(error);
      }
    }
  }
};
exports.verifyAccount = async (req, res) => {
  const { email, otp } = req.body;
  // console.log(email, otp);

  const checkFields = emailOtpInpCheck(email, otp);

  if (checkFields) {
    return res.status(400).send({
      ...checkFields,
    });
  } else {
    const emailDecoded = await decodedEmail(email);
    // console.log(emailDecoded);
    if (emailDecoded?.error) {
      return res.status(400).send({
        message: emailDecoded.error,
      });
    } else {
      const isAccount = await haveAccount(emailDecoded.email);
      // console.log("ami is account", isAccount);
      if (!isAccount) {
        return res.status(404).send({
          message: "you have no account",
        });
      } else {
        if (isAccount.verified) {
          return res.status(409).send({
            message: "Your Account Is Already Verified",
          });
        } else {
          if (!isAccount.otp) {
            return res.status(408).send({
              message: "verify time out",
            });
          } else {
            if (isAccount.otp !== otp) {
              return res.status(400).send({
                message: "otp not match",
              });
            } else {
              try {
                await User.findOneAndUpdate(
                  { email: isAccount.email },
                  {
                    // $set: {
                    otp: "",
                    verified: true,
                    // },
                  }
                );

                // console.log(data);
                return res.status(200).send({
                  message: "Verification Succesful",
                });
              } catch (error) {
                return res.status(500).send({
                  message: "Verification Faild",
                });
              }
            }
          }
        }
      }
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);

  const checkFields = loginInputsCheck(email, password);
  // console.log(checkFields);

  if (checkFields) {
    return res.status(400).send({
      ...checkFields,
    });
  } else {
    const validMail = validEmail(email);
    // console.log(validMail);

    if (validMail) {
      return res.status(400).send({
        message: validMail,
      });
    } else {
      if (password.length < 4 || password.length > 16) {
        return res.status(400).send({
          message: "type password 4 to 16 latters",
        });
      } else {
        try {
          let data = await User.findOne({ email }).populate("profilePic");
          if (!data) {
            return res.status(404).send({
              message: "you have no account",
            });
          } else {
            // console.log("ami login data", data);
            const matchPassword = await hashCompare(data.password, password);
            if (!matchPassword) {
              return res.status(400).send({
                message: "invalid password",
              });
            } else {
              if (!data.verified) {
                return res.status(403).send({
                  message: "Please Check Email And Verify Your Account",
                });
              } else {
                data = data.toObject();
                delete data.password;
                delete data.otp;
                console.log("hey");
                return res.status(200).send({
                  message: "login successfull",
                  data,
                });
              }
            }
          }
        } catch (error) {
          return res.status(500).send({
            message: "login faild",
          });
        }
      }
    }
  }
};

exports.allUser = async (req, res) => {
  const { loginuser } = req.query;

  if (!loginuser) {
    return res.status(404).send({ message: "User not found" });
  }
  const isAccount = haveAccount(loginuser);

  if (!isAccount || isAccount?.error) {
    return res.status(404).send({ message: "User not found" });
  }
  try {
    let data = await User.find({ _id: { $ne: loginuser } });
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
exports.sendResetPassMail = async (req, res) => {
  const { email } = req.body;

  const checkFields = checkEmailInput(email);

  if (checkFields) {
    return res.status(400).send({
      message: checkFields,
    });
  } else {
    const isAccount = await haveAccount(email);

    if (!isAccount) {
      return res.status(404).send({
        message: "you have no account",
      });
    } else {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      try {
        let data = await User.findOneAndUpdate(
          { email: isAccount.email },
          {
            otp,
          },
          { new: true }
        );
        const hash = hashSync(data.otp);
        const tokenEmail = emailToken(data.email);
        console.log(hash);
        console.log(tokenEmail);

        const template = `<h2>reset password</h2></br><a href=${hash}/${tokenEmail}>click to verify</a>`;

        await sendMail(email, template);

        setTimeout(async () => {
          await User.findOneAndUpdate(
            { email: data.email },
            {
              // $set: {
              otp: "",
              // },
            }
          );
        }, 300000);

        console.log(data);
        return res.status(200).send({
          message: "please check your email",
        });
      } catch (error) {
        return res.status(500).send({
          message: "bad request",
          // error: err.Error,
        });
      }
    }
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  const inputCheck = resetPasswordInput(email, otp, password);

  if (inputCheck) {
    return res.status(400).send({
      ...inputCheck,
    });
  } else {
    const emailDecoded = await decodedEmail(email);
    console.log("k", emailDecoded);
    if (emailDecoded?.error) {
      return res.status(400).send({
        message: emailDecoded.error,
      });
    } else {
      const isAccount = await haveAccount(emailDecoded.email);

      if (!isAccount) {
        return res.status(404).send({
          message: "you have no account",
        });
      } else {
        if (!isAccount?.otp) {
          return res.status(408).send({
            message: "otp time out",
          });
        } else {
          const compareHash = await hashCompare(otp, isAccount.otp);

          if (!compareHash) {
            return res.status(408).send({
              message: "invalid link",
            });
          } else {
            const hash = await hashSync(password);

            try {
              await User.findOneAndUpdate(
                {
                  email: isAccount.email,
                },
                {
                  otp: "",
                  password: hash,
                }
              );

              return res.status(200).send({
                message: "password update successfull",
              });
            } catch (error) {
              return res.status(500).send({
                message: "bad request",
                // error: err.Error,
              });
            }
          }
        }
      }
      // console.log(isAccount);
    }
  }
};

exports.updateProfilePic = async (req, res) => {
  const { name, ownerId, image } = req.body;

  const checkFields = profilePicInputs(name, ownerId, image);

  if (checkFields) {
    return res.status(400).send({
      ...checkFields,
    });
  } else {
    const isAccount = await haveUser(ownerId);

    if (isAccount?.error || !isAccount) {
      return res.status(404).send({
        message: "Invalid User",
      });
    } else {
      const fileName = `/uploads/profile-picture-${Date.now()}.webp`;
      const imageArr = image.split(",");

      fs.writeFile("." + fileName, imageArr[1], "base64", async function (err) {
        if (err) {
          // console.log(err);
          return res.status(400).send({
            message: "Picture Upload Problem",
          });
        } else {
          console.log("awesome", fileName);
          let upload = new Post({
            ...req.body,
            image: fileName,
            types: "profilePic",
          });
          try {
            upload = await upload.save();
            let data = await User.findByIdAndUpdate(
              upload.ownerId,
              {
                profilePic: upload._id,
              },
              { new: true }
            ).populate("profilePic");
            data = data.toObject();
            delete data.password;
            delete data.otp;
            return res.status(200).send({
              message: "Picture Change Successfull",
              data,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }
};
