const express = require("express");
const app = express();
const connectDb = require("./config/database"); // Database connection
const User = require("./models/user"); // User model

// Middleware to parse JSON bodies
app.use(express.json());

// Signup route

app.post("/signup", async (req, res) => {
  console.log(req.body); // Log the request body to verify incoming data

  // Creating an instance of User model
  const user = new User(req.body);

  try {
    await user.save(); // Save the user to the database
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error("Error saving the user:", err); // Log the actual error
    res.status(400).send("Error saving the user: " + err.message);
  }
});

//get users by email

app.get("/user", async (req,res)=>{
const userEmail = req.body.emailId;

try{

    const users = await User.find({emailId: userEmail});
    if(users.length===0){
        res.status(404).send("User Not found")
    }
    else{

         res.send(users);
    }
   

}
catch(err){
    res.status(400).send("something went wrong")

}



})

// partial update into server

app.patch("/user",async(req,res)=>{
  // id is unique way to identify whichever document to be updated
const userId = req.body.userId;
const data = req.body;
try{

  // mujhe kya badlna hai request karne p
  const ALLOWED_UPDATES =[   
   "UserId",
   "photoUrl",
   "about",
   "gender",
   "age",
   "skills",
   ];
    // kya badalne wala chiz mere data me hai
   const isUpdatedAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k));

   if(!isUpdatedAllowed){

    res.status(400).send("Updated not allowed");
   
  }


const user =await  User.findByIdAndUpdate({_id:userId},data,{runValidators:true,});
console.log(user);
res.send("user updated succesfully");


}
catch(err){
  res.send(402).send("something went wrong");


}

});

// delete into server.

app.delete("/user",async(req,res)=>{
const userId = req.body.userId;
try{
const user = await User.findByIdAndDelete(userId);
  res.send("user deleted succesfully");

}
catch(err){
  res.send(402).send("something went wrong");



}


});






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
