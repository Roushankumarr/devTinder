// models/user.js

const mongoose = require("mongoose");
const validator=require("validator")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// Define the user schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength:4,
  },
  lastName: {
    type: String,
    
  },
  emailId: {
    type: String,
    lowercase:true,
    required: true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email address",+ value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Not strong password",+ value);
      }
    }
  },
  age: {
    type: Number,
    min:18,
    
  },
  gender: {

    type: String,

    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender not valid");
      }
    }
    
  },
  photoUrl:{
    type:String,
  },
  about:{
    type:String,
    default:"This is a default about of the User",
  },
  skills:{
    type:[String],
  },

},{
  timestamps:true,
});


userSchema.methods.getJWT= async function(){
   const user = this;
   const token = await jwt.sign({_id:user._id},"Roush@Golu?/.<>#568",{
    expiresIn:"1d",
   });// sign(jis id se login hue, secretkey);
return token;

}
userSchema.methods.validatePassword= async function(inputPassword){
  const user = this;
  const passwordHash = user.password;
  const isPassword = await bcrypt.compare(inputPassword,passwordHash);

  return isPassword;
}

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
