const express=require("express")
const app=express()
require("dotenv").config()
const{connection}=require("./db")
const{userRouter}=require("./routes/User.routes")
const{productRouter}=require("./routes/products.routes")
const{auth}=require("./middleware/auth.middleware")

const {cartRouter}=require("./routes/cart.routes")
const cors=require("cors")

//extras
app.use(express.json())
app.use(cors())
//routes

//routes and middelware
app.use("/users",userRouter)
app.use("/products",productRouter)
app.use(auth)
app.use("/cart",cartRouter)


app.listen(8732,async()=>{
  try {
    await connection
    console.log("Server is connected with mongodb") 
  } catch (error) {
    console.log(`Server is not connected with mongodb`)
  }


    console.log(`Server is running at port ${8732}`)
})