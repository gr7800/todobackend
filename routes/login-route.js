const{Router}=require("express")
const {userModel}= require("../model/User.model")

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const loginRoute=Router();



loginRoute.post("/login",async(req,res)=>{
    let {email,password}= req.body
    let user = await userModel.findOne({email})
    let hash = user.password
    bcrypt.compare(password,hash,async function(err,result){
        if(user && result){
            var token = jwt.sign({userId: user._id},process.env.PRIVTAE_KEY);
            res.send({
                message:"Login Successful",
                token,
                user
            })

        }else{
            res.status(400).send({"Error":"Something Error"})
        }
    })
})

module.exports={
    loginRoute
}