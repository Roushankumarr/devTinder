const express =require("express");
const profileRouter = express.Router();
const { validateProfiledata } = require("../utils/validator");
const {userAuth} = require("../middlewares/userAuth");

const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const { validate } = require("../models/user");

profileRouter.get("/profile/view",userAuth, async (req, res) => {
  

    // jb bhi koi naya request maronge server p tb kya honga, phle to jo token generates usko validate karenga then uske baad kya dikhana hai woh honga
     try{
      const user = req.user;
      res.send(user);
     }
     catch(err){
  
      res.status(400).send("Error:"+ err.message);
  
    }
  })

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  //validate the request body
  try{
    if(!validateProfiledata(req)){
    throw new Error("Cannot be edited");
}

   //we know about the whole user data....
   const loggedInuser = req.user;

   //to edit with respect to request body data....logic 

   Object.keys(req.body).forEach((key)=>(loggedInuser[key]=req.body[key]));
   console.log(loggedInuser);
   
   // save this user also

   await loggedInuser.save();



   res.send(`${loggedInuser.firstName},"your profile is updated succesfully"`);



  }
  catch(err){
  
    res.status(400).send("Error:"+ err.message);

  }

  

   

})  

// Change Password Based on Email (with Authentication)
profileRouter.patch('/profile/forgotPassword', userAuth, async (req, res) => {
    const { emailId, newPassword } = req.body;
  
    try {
      // Step 1: Verify the authenticated user (req.user is available from userAuth)
      const loggedInUser = req.user;
  
      // Step 2: Check if the email provided matches the logged-in user's email
      if (loggedInUser.emailId !== emailId) {
        return res.status(400).send('Email does not match the authenticated user.');
      }
  
      // Step 3: Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Step 4: Update the user's password
      loggedInUser.password = hashedPassword;
      await loggedInUser.save();
  
      // Step 5: Send a success response
      res.status(200).send('Password has been updated successfully.');
    } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
    }
  });
  



module.exports ={profileRouter};