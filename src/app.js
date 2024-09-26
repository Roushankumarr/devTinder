// creating server
const express = require("express");
const app = express();
app.get("/get",(req,res)=>{
res.send("h5555o66666");
})

app.listen(7000,()=>{
    console.log("server is running")
});