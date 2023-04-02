const jwt=require("jsonwebtoken")
let cartauth=(req,res,next)=>{
    const token=req.headers.authorization
   if(token){
    jwt.verify(token, 'BYST',async function(err, decoded) {
        console.log(decoded.userid==req.body.userid)
        if(decoded.userid==req.body.userid){
           next()
        }else{
            res.status(400).send("Login for checking cart")
        } // bar
      });
    }
    res.status(400).send("Login for checking cart")
}


module.exports={cartauth}