// creating server
const express = require("express");
const app = express();
// route handlers which handles the routes 
app.use(
    "/user" ,
    (req, res, next)=> {
    console.log() ;
    // res. send("Response 1") ;
    next() ;
    },
    (req, res)=> {
    console.log("the route user 2!!");
    // res.send("Response 2" );
    }
    )

app.listen(7000,()=>{
    console.log("server is running")
});