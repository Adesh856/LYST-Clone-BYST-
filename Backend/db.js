const mongoose=require("mongoose")
require("dotenv").config()
const connection=mongoose.connect("mongodb+srv://adesh:adeshtayde@cluster0.tebj3jv.mongodb.net/Apiproject_BYST?retryWrites=true&w=majority")

module.exports={connection}