const express=require("express")
const productRouter=express.Router()
const{productModel}=require("../model/products.model")
const jwt=require("jsonwebtoken")

///products/get

productRouter.get("/",async(req,res)=>{
    let {page,limit,sort}=req.query
   page=+page;
   limit=+limit
    try {
       const Page=page||1;
       const Limit=limit||10
       const skip=(Page-1)*limit
       let products;
       const productlength=await productModel.find()
       if(sort=="asc"){
        sort=1
        products=await productModel.find().sort({price:sort}).skip(skip).limit(Limit)
       }else if(sort=="desc"){
        sort=-1
        products=await productModel.find().sort({price:sort}).skip(skip).limit(Limit)
       }else{
        products=await productModel.find().skip(skip).limit(Limit)
       }
                res.status(200).send({data:products,counts:productlength.length})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
productRouter.get("/search/:name",async(req,res)=>{
    let {page,limit,sort}=req.query
    let {name}=req.params
    console.log(name)
    page=+page;
    limit=+limit
    try {
        const Page=page||1;
       const Limit=limit||10
       const skip=(Page-1)*limit
       const productlength=await productModel.find()
       const regex = new RegExp(name, "i")
        products=await productModel.find({name: regex}).skip(skip).limit(Limit)
        res.status(200).send({data:products,counts:productlength.length})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//// filter route

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