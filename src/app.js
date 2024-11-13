const express = require("express");
const app = express();
const connectDb = require("./config/database"); // Database connectio
const User = require("./models/user"); // User model
const {authRouter} =require("./routes/auth");
const {profileRouter} =require("./routes/profile");
const {requestRouter} =require("./routes/request");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userRouter } = require("./routes/user");

// Middleware to parse JSON bodies
app.use(express.json());


// Use cookie-parser middleware
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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
