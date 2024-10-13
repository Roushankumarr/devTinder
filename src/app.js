// Creating server
const express = require("express");
const app = express();
const connectDb = require("./config/database"); // Database connection
const User = require("./models/user"); // User model

// Middleware to parse request body
app.use(express.json());

// Connect to the database
connectDb()
  .then(() => {
    console.log("Connected to database");

    // Start the server only after successful DB connection
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });

// Signup route
app.post("/signup", async (req, res) => {
  try {
    // Create new user instance
    const user = new User({
      firstName: "Roushan",
      lastName: "Kumar",
      emailId: "roushan123patna@gmail.com",
      password:"abc@123"
    });

    // Save user to the database
    await user.save();

    res.send("User added successfully");
  } catch (error) {
    console.log("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
});
