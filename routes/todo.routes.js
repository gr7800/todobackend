const express = require("express");
const { authentication } = require("../middlewares/authentication.middleware");
const { TodoModel } = require("../models/Todo.model");
const todoRoutes = express.Router();

todoRoutes.get("/",authentication,async (req,res)=>{
    email = req.body.email;
    const {status,tag} = req.query;
    if(status && tag){
        const todos = await TodoModel.find({ userEmail: email,status,tag });
        res.send(todos);
    }else if(status){
        const todos = await TodoModel.find({ userEmail: email,status });
        res.send(todos);
    }
    else{
        const todos = await TodoModel.find({ userEmail: email });
        res.send(todos);
    }
})
todoRoutes.get("/:todoID",authentication,async (req,res)=>{
    const { todoID } = req.params;
    try {
      const todo = await TodoModel.findOne({ _id: todoID });
      res.send(todo);
      
    } catch (error) {
      res.status(404).send({ "message": `Todo with id ${todoID} not found`});
    }
});

todoRoutes.post("/post",authentication,async (req,res)=>{
    const {taskname,status,tag,email} = req.body;
    const todo = await TodoModel.findOne({taskname,status,tag,userEmail:email});
    if(todo){
        res.send({"message":"Todo already exists",todo});
    }else{
        const newTodo = new TodoModel({
            taskname,
            status,
            tag,
            userEmail:email
        })
        try {
            await newTodo.save();
            res.send({"message":"Todo added successfully"})
        } catch (error) {
            res.status(500).send({"message":"Something went wrong",error});
        }
    }

})
todoRoutes.patch("/edit/:todoID",authentication,async (req,res)=>{
    const {todoID} = req.params;
    try {
        const todo = await TodoModel.findOne({ _id: todoID });
        if (todo) {
          try {
            await TodoModel.updateOne({ _id: todoID }, req.body);
            res.send({ message: "Todo updated successfully" });
          } catch (error) {
            res.status(500).send({ message: "Something went wrong", error });
          }
        } else {
          res
            .status(404)
            .send({ message: `Todo with id ${todoID} not found!` });
        }
    } catch (error) {
        res.status(500).send({"message":"Something went wrong",error});
    }
    
})
todoRoutes.delete("/delete/:todoID",authentication,async (req,res)=>{
    const {todoID} = req.params;
    try {
        const todo = await TodoModel.findOne({ _id: todoID });
        if (todo) {
          try {
            await TodoModel.deleteOne({ _id: todoID });
            res.send({ message: "Todo deleted successfully" });
          } catch (error) {
            res.status(500).send({ message: "Something went wrong", error });
          }
        } else {
          res
            .status(404)
            .send({ message: `Todo with id ${todoID} not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error });
    }
    
})



module.exports = {todoRoutes};