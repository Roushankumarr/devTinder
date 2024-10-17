
const jwt = require('jsonwebtoken');
const User =require("../models/user")

const userAuth = async (req,res,next)=>{
    try
    {
        const {token}= req.cookies;

        if(!token){
            throw new Error("invalid tokens");
            
        }
        const decodedmssg = await jwt.verify(token,"Roush@Golu?/.<>#568");

        const{_id}= decodedmssg;

        const user = await User.findOne({_id});

        if(!user){
            throw new Error("User doesnot exists");
        }
        req.user= user;
        next();

    }
       
 
    catch(err){

      res.status(400).send("Error:"+ err.message);

    }



};
module.exports = {userAuth};