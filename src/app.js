const express = require("express");
const app = express();
const connectDb = require("./config/database"); // Database connectio
const User = require("./models/user"); // User model
const { validateSignupData } = require("./utils/validator");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require("./middlewares/userAuth");

// Middleware to parse JSON bodies
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Signup route

app.post("/signup", async (req, res) => {
  console.log(req.body); // Log the request body to verify incoming data



  try {
    // validate the data
    validateSignupData(req);

    //extracting values 

    const { firstName, lastName, emailId, password } = req.body;

    //encrypt password

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    // Creating an instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save(); // Save the user to the database
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error("Error saving the user:", err); // Log the actual error
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// login route

app.post("/login", async (req, res) => {
  try {

    // extracting data from request
    const { emailId, password } = req.body;

    // checking this email id already exist or not in the database

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Users doesnot exists");
    }

    // checking the password 
    const isPassword = await user.validatePassword(password);

    if (isPassword) {
     // generate tokens

     const token = await user.getJWT();
     console.log(token);
    
     // iss token ko cookie me add kar dun
     res.cookie("token",token);
      res.send("login succesfully");
    }
    else {
      throw new Error("password is incorrect");
    }


  }
  catch (err) {

    res.status(400).send("Error saving the user: " + err.message);
  }


})

app.get("/profile",userAuth, async (req, res) => {
  

  // jb bhi koi naya request maronge server p tb kya honga, phle to jo token generates usko validate karenga then uske baad kya dikhana hai woh honga
   try{
    const user = req.user;
    res.send(user);
   }
   catch(err){

    res.status(400).send("Error:"+ err.message);

  }
})







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
