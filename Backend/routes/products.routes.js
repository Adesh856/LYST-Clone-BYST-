const express=require("express")
const productRouter=express.Router()
const{productModel}=require("../model/products.model")

///products/get

productRouter.get("/",async(req,res)=>{
    try {
        const products=await productModel.find({userid:req.body.userid})
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//add products
productRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try {
        const products=new productModel(payload)
        await products.save()
        res.status(200).send({"msg":"Product has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//update products
productRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const payload=req.body
    try {
        await productModel.findByIdAndUpdate({userid:req.body.userid,_id:id},payload)
        res.status(200).send({"msg":"Product has been Updated"}) 
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//delete 
productRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await productModel.findByIdAndDelete({userid:req.body.userid,_id:id})
        res.status(200).send({"msg":"Product has been Deleted"}) 
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={productRouter}