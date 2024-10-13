// models/user.js

const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailId: { type: String, required: true },
  password: { type: String, required: true },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
