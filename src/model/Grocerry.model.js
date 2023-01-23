const mongoose = require("mongoose");

const grocerrySchema = new mongoose.Schema({
    name: { type: String, require: true },
    qty: { type: Number } || 1,
    price:{type:Number,require:true},
    description: { type: String, require: true },
    image: { type: String, require: true },
})

const Grocerry = mongoose.model("grocerry",grocerrySchema);

module.exports = Grocerry;