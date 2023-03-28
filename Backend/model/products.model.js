const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    image:String,
    brand:String,
    description:String,
    price:Number,
    userid:String,
},{
    versionKey:false
})

const productModel=mongoose.model("products",productSchema)

module.exports={productModel}