const User=require("../model/User.model")
const argon2 =require("argon2")
const jwt= require("jsonwebtoken")
exports.register=async(req,res)=>{
    const {email,password}= req.body;
    let user = await User.findOne({email:email})
    const hash= await argon2.hash(password)
    try{
       if(user){
         return res.status(400).send("user already exist")
       }else{
        const newUser= new User({email,password:hash});
        await newUser.save();
        return res.status(201).send({meassage:"user created sucessfully","user":newUser})
       }      
    }
    catch(e){
     console.log(e.meassage)
    }
}

exports.login=async(req,res)=>{
    const {email, password}= req.body;
    const user= await User.findOne({email});
    if(await argon2.verify(user.password,password)){
        const token= jwt.sign({
            ...user
        },"Guddu12345",{
            expiresIn:"7 days"
        })
        const refreshToken=jwt.sign({id:user._id},"GUDDU",{
            expiresIn:"28 days"
        })
        return res.send({message:"Login success",token, refreshToken, user:user})
    }

    return res.status(401).send("Invalid credentials");
}