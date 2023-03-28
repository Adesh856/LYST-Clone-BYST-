const express=require("express")
const app=express()
require("dotenv").config()
const{connection}=require("./db")
const{userRouter}=require("./routes/User.routes")
const{productRouter}=require("./routes/products.routes")
const{auth}=require("./middleware/auth.middleware")
app.use(express.json())

//routes
app.use("/users",userRouter)
app.use(auth)
app.use("/products",productRouter)
app.listen(process.env.port,async()=>{
  try {
    await connection
    console.log("Server is connected with mongodb") 
  } catch (error) {
    console.log(`Server is not connected with mongodb`)
  }


    console.log(`Server is running at port ${process.env.port}`)
})