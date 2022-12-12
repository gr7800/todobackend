const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    ip:{type:String}
})

const UserModel = mongoose.model("user",userSchema);
module.exports = {UserModel};