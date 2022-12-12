const express = require("express");
const { UserModel } = require("../models/User.model");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send({
          "message": "Something went wrong try again later",
          "error": err,
        });
      } else {
        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.send({ "message": "Login successfull", token });
      }
    })
  } else {
    res.status(404).send({ "message": "Please signup" });
  }
})

authRoutes.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user?.email) {
    res.send({ "message": "User with this email already exists" });
  } else {
    try {
      bcrypt.hash(password, 4, async function (err, hash) {
        const user = new UserModel({ email, password: hash, ip:req.ip })
        await user.save()
        res.send({message:"Sign up successfull"})
      });

    }
    catch (err) {
      console.log(err)
      res.send("Something went wrong, pls try again later")
    }
  }
})

module.exports = { authRoutes }