const mongoose=require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/qusdb")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection=new mongoose.model("users",LogInSchema)

module.exports=collection