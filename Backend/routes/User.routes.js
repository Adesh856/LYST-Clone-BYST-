const express=require("express")
const userRouter=express.Router()
const{UserModel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


//Registration routes
userRouter.post("/register",async(req,res)=>{
    const {name,password,email}=req.body
    try {
        bcrypt.hash(password, 5,async function(err, hash) {
            // Store hash in your password DB.
            const user=new UserModel({password:hash,name,email})
            await user.save()
            res.status(200).send({"msg":"Registration Successful"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == false
                if(result){
                    res.status(200).send({"msg":"Login Successfully","token":jwt.sign({"userid":user._id},"BYST",{ expiresIn: '1h' })})
                }else{
                    res.status(400).send({"msg":"Invalid Credentials"})
                }
            });
        }else{
            res.status(400).send({"msg":"Invalid Credentials"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


module.exports={userRouter}