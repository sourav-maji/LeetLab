import express from "express"
import dotenv from "dotenv"


dotenv.config({path:"./.env"})

const app = express()

const PORT = process.env.PORT || 8000

app.get("/", (req,res)=>{
    res.json({"message" : "Server is Up and running"})
})

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`);
    
})