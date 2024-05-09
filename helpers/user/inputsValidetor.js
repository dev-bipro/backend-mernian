exports.checkRegInp = (
  name = "",
  email = "",
  password = "",
  confirmPassword = "",
  gender = ""
) => {
  // console.log(name);
  let errors = null;

  if (!name || !email || !password || !confirmPassword || !gender) {
    errors = {
      message: "check your inputs fields",
    };
  } else {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailRegex.test(email);
    // console.log(validEmail);
    if (password != confirmPassword) {
      errors = {
        message: "check your confirm password",
      };
    } else if (!validEmail) {
      errors = {
        message: "check your email",
      };
    }
  }
  return errors;
};
exports.emailOtpInpCheck = (email = "", otp = "") => {
  let errors = null;

  if (!email && !otp) {
    errors = {
      email: "please type your email",
      otp: "please provide your otp",
    };
  } else {
    if (!email) {
      errors = {
        email: "please type your email",
      };
    } else if (!otp) {
      errors = {
        otp: "please provide your otp",
      };
    }
  }
  return errors;
};

exports.loginInputsCheck = (email = "", password = "") => {
  let errors = null;

  if (!email && !password) {
    errors = {
      email: "please type your email",
      password: "please type your password",
    };
  } else {
    if (!email) {
      errors = {
        email: "please type your email",
      };
    } else if (!password) {
      errors = {
        password: "please type your password",
      };
    }
  }

  return errors;
};

exports.validEmail = (email) => {
  const mailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const rightMail = mailRegex.test(email);
  let errors = "";
  if (!rightMail) {
    errors = "please type a valid email";
  }
  return errors;
};

exports.checkEmailInput = (email = "") => {
  let error = "";
  if (!email) {
    error = "please provide your email";
  }

  return error;
};

exports.resetPasswordInput = (email = "", otp = "", password = "") => {
  let errors = null;
  if ((!email || !otp) && !password) {
    errors = {
      link: "invalid link",
      password: "please type your email",
    };
  } else if (!email || !otp) {
    errors = {
      link: "invalid link",
    };
  } else if (!password) {
    errors = {
      password: "please type your email",
    };
  }

  return errors;
};

exports.profilePicInputs = (name = "", ownerId = "", image = "") => {
  let errors = null;

  if (!name && !ownerId && !image) {
    errors = {
      name: "Please Provide Image Name ",
      ownerId: "Please Provide Owner Id ",
      image: "Please Select An Image ",
    };
  } else {
    if (!name && !ownerId) {
      errors = {
        name: "Please Provide Image Name ",
        ownerId: "Please Provide Owner Id ",
      };
    } else if (!ownerId && !image) {
      errors = {
        ownerId: "Please Provide Owner Id ",
        image: "Please Select An Image ",
      };
    } else if (!name && !image) {
      errors = {
        name: "Please Provide Image Name ",
        image: "Please Select An Image ",
      };
    } else {
      if (!name) {
        errors = {
          name: "Please Provide Image Name ",
        };
      } else if (!ownerId) {
        errors = {
          ownerId: "Please Provide Owner Id ",
        };
      } else if (!image) {
        errors = {
          image: "Please Select An Image ",
        };
      }
    }
  }

  return errors;
};
