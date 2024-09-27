const adminAuth = (req,res,next)=>{
const token = "xhuhdydiuddjnlk";
const isAdminAuth = token =="xyz";
if(isAdminAuth){
    res.status(401).send("unauthorized acces");
}
else{
    next();
}

}
const userAuth =(req,res,next)=>{
    const token = "xhuhdydiuddjnl";
    const isUserAuth =token === "xyz";
    if(isUserAuth){
        res.status(401).send("unauthorized acces");
    }
    else{
        next();
    }
    
    }

    module.exports={adminAuth,userAuth,};