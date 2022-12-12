const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  status: { type: String,required:true},
  tag: { type: String,required:true},
  userEmail:{type:String}
});

const TodoModel = mongoose.model("todo",todoSchema);
module.exports = {TodoModel};