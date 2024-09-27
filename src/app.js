// creating server
const express = require("express");
const app = express();

// working with middlewares
const {adminAuth,userAuth}=require("./middlewares/auth");

app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.get("/admin/getalladmindata",(req,res)=>{
   console.log("admin data sent");
   res.send("admin all data");
    
})
app.post("/admin/sendalladmindata",(req,res)=>{
    console.log(" sent");
    res.send("sent data successfully");
     
 })
 


app.listen(7000,()=>{
    console.log("server is running")
});