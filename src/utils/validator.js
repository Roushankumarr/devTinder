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

const validateProfiledata =(req)=>{
    const Allowed_edit =["firstName","lastName","emailId","password","age","about","imageUrl","skills"];

    const isEdit = Object.keys(req.body).every((key)=>Allowed_edit.includes(key));
   
    return isEdit;

}

module.exports = {validateSignupData,validateProfiledata};
