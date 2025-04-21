import express from "express"

const app = express()

app.get("/", (req,res)=>{
    res.json({"message" : "Server is Up and running"})
})

app.listen(8000, (req,res)=>{
    console.log(`Server is running on port 8000`);
    
})