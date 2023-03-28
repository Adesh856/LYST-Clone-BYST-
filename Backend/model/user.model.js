const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{
    versionKey:false
})

const UserModel=mongoose.model("Users",UserSchema)

module.exports={UserModel}