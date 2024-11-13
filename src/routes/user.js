const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connection");
const User = require("../models/user");

userRouter.get("/user/connections",userAuth,async(req,res)=>{

    try{
        const USER_Safe_Data =["firstName","lastName"];
        //get details of loggedInuser
        const loggedInUser = req.user;

        // find the document in connection table where its loggedinuser Id should match either in toUserid or FromuserId
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
                
            ]
        }).populate("fromUserId",USER_Safe_Data)
           .populate("toUserId",USER_Safe_Data);

        const data = await connectionRequest.map((row)=>{
            if(row.toUserId.equals(loggedInUser._id)){
                return row.toUserId;
            }
            return row.fromUserId;

        })   

        res.json({data});

    }
    catch(err){
        res.status(400).json(
            {
                message:""
            }
        )
    }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
       //user should see all the user card except
       //0. his own card
       //1. his connections
       //2. ignored people
       //3. already sent the connection request

       //example:Rohit ={Akshay,Elon,Mark,Donald,Ms Dhoni,Virat}
       //R->Akshay->rejected  R->elon->accepted

       const page = parseInt(req.query.page)||1;
       let limit = parseInt(req.query.limit)||10;
       limit=limit>50 ? 50 :limit;
       const skip = (page-1)*limit;


       const loggedInUser =req.user;

       // find all connection request(sent+recieved)
       const connectionRequest= await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ],
       }).select("fromUserId","toUserId")

       const hideUserFromFeed = new Set();

       connectionRequest.forEach(req=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());

       })

       const users = await  User.find({
        $and:[{_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne:loggedInUser._id}},
        ],
       }).select(USER_Safe_Data)
       .skip(skip)
        .limit(limit)

  res.json({data:users});

    }
    catch(err){
   res.status(400).json({message:err.message});
    }
})



module.exports = {userRouter};