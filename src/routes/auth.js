const express =require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// signup while registering

authRouter.post("/signup", async (req, res) => {
    console.log(req.body); // Log the request body to verify incoming data
  
  
  
    try {
      // validate the data
      validateSignupData(req);
  
      //extracting values 
  
      const { firstName, lastName, emailId, password,imageUrl,age,skills } = req.body;
  
      //encrypt password
  
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
  
      // Creating an instance of User model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashPassword,
        imageUrl,
        age,
        skills ,
      });
  
      await user.save(); // Save the user to the database
      res.status(201).send("User added successfully");
    } catch (err) {
      console.error("Error saving the user:", err); // Log the actual error
      res.status(400).send("Error saving the user: " + err.message);
    }
  });
  
  // login route
  
  authRouter.post("/login", async (req, res) => {
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
      
       // iss token ko cookie me add kar dun...
       res.cookie("token",token,
        {expires: new Date(Date.now()
       + 8 * 3600000)},);
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

  // logout route
  authRouter.post("/logout",async(req,res)=>{

    res.cookie("token",null,
        {expires: new Date(Date.now()+0
        )}
    )
    res.send("Log out succesfully");
     

  })


module.exports ={authRouter};