const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    return res.json({ms:"op"})
})

app.listen(3000,()=>{
    console.log("run on 3000 server");
    
})