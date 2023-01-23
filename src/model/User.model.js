const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        reuire:true,
    },
    password:{
        type:String,
        require:true,
    }  
})

const User= mongoose.model("user",userSchema)
module.exports=User