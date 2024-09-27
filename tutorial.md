creating server using express.
understanding routing using HTTP methods.
In routes we understand the structures of url like /something with use of different operators +,-,?,() .
use of regular expression and regex in routes.
***one route can have multiple route handlers
as response is not send then our request is hanging out by lets an example here..app.use("/user",(req,res)=>{
    // nothing
}, (req,res)=>{
    res.send("hello")
})
from above code we have passed over two route handlers but in first route handlers response is not maintained then we can say that request is hanging out but next route handler is not called
EXPRESSjs  has introduced the new concept like next().\

app.use(
" /user" ,
(req, res, next) {
console.log() ;
res. send("Response !!) ;
next() ;
},
(req, res) {
console.log(the route user 2!!);
res.send(Response!! );
}
)