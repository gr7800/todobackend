const{Router}=require("express")
const {userModel}= require("../model/User.model")

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const signuRoute=Router();

signuRoute.post("/signup", async(req,res)=>{
    let{name, email, password}=req.body

    try{
        let user = await userModel.findOne({email:email})
        if(user){
           return res.status(409).send("Already Registered, Please Login")
        }
        else{
            bcrypt.hash(password,6,async function(err,hash){
                if(err){
                    res.send({"Error":"Something wrong"})
                    console.log(err);
                }else{
                    const newUser= new userModel({name, email, password:hash})
                    await newUser.save()
                    res.send({"message":"Succesfully Registered", user: newUser})
                }
            })
        }
    }catch(err){
        return res.status(401).send(e.message)
    }

})



module.exports={
    signuRoute
}