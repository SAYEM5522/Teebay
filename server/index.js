import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
const PORT=process.env.PORT||8081
const app=express()
app.use(cors())
app.use(bodyParser())
app.get("/",(req,res)=>{
  res.status(200).send("done")
})

app.listen(PORT,()=>console.log(`server is running on ${PORT}`))