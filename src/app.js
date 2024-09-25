// creating server
const express = require("express");
const app = express();
app.use("/get",(req,res)=>{
res.send("h5555o");
})

app.listen(7000,()=>{
    console.log("server is running")
});