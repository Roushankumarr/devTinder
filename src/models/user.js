// models/user.js

const mongoose = require("mongoose");
const validator=require("validator")
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

});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
