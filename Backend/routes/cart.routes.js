const express=require("express")
const cartRouter=express.Router()
const{CartModel}=require("../model/cart.model")
const jwt=require("jsonwebtoken")

///cart/get

cartRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    try {
        jwt.verify(token, 'BYST',async function(err, decoded) {
            console.log(decoded.userid==req.body.userid)
            if(decoded.userid==req.body.userid){
                const cart=await CartModel.find()
                res.status(200).send({data:cart,counts:cart.length})
            }else{
                res.send("Login for checking products")
            } // bar
          });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//// filter route

//add products
cartRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try {
        jwt.verify(token, 'BYST',async function(err, decoded) {
            console.log(decoded.userid==req.body.userid)
            if(decoded.userid==req.body.userid){
                const cart=new CartModel(payload)
        await cart.save()
        res.status(200).send({"msg":"Product has been added"})
            }else{
                res.send("Login for checking products")
            } // bar
          });
       
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//update products
cartRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const payload=req.body
    try {
        jwt.verify(token, 'BYST',async function(err, decoded) {
            console.log(decoded.userid==req.body.userid)
            if(decoded.userid==req.body.userid){
                await CartModel.findByIdAndUpdate({_id:id},payload)
                res.status(200).send({"msg":"Product has been Updated"}) 
        await cart.save()
        res.status(200).send({"msg":"Product has been added"})
            }else{
                res.send("Login for checking products")
            } // bar
          });
   
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//delete 
cartRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        jwt.verify(token, 'BYST',async function(err, decoded) {
            console.log(decoded.userid==req.body.userid)
            if(decoded.userid==req.body.userid){
                await CartModel.findByIdAndDelete({userid:req.body.userid,_id:id})
                res.status(200).send({"msg":"Product has been Deleted"}) 
            }else{
                res.send("Login for checking products")
            } // bar
          });
      
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={cartRouter}