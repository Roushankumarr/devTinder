const validator = require("validator");

const validateSignupData = (req) => {
  // extracting values from req
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Not a valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Not a strong password");
  }
};

module.exports = {validateSignupData};
