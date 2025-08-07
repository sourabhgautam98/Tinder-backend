const express= require("express")

const app = express()

app.use("/",(req,res) =>{
  res.send("hello 2")
})

app.use("/test",(req,res) =>{
  res.send("world ")
})



app.listen(3000, () =>{
  console.log("my srver")
})