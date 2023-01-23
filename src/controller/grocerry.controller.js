const Grocerry = require("../model/Grocerry.model")

exports.Add = async (req, res) => {
    const { name, qty, price, description, image } = req.body;

    let item = await Grocerry.findOne({ name: name });

    try {
        if (item) {
            return res.status(400).send("The same name Grocerry is already exist");
        } else {
            const newGrocerry = new Grocerry({ name, qty, price, description, image });
            await newGrocerry.save();
            return res.status(201).send({ meassage: "Grocerry Item added Sucessfully", "Grocerry": newGrocerry })
        }
    } catch (error) {
        console.log(e.meassage);
    }
}

exports.GetAllItem = async (req,res)=>{
    try {
        let items = await Grocerry.find();
        return res.status(200).send(items);
    } catch (error) {
        console.log(error)
        res.status(401).send({ "err": "Somthing went wrong Item is not persent" })
    }
}
exports.GetAllItembySearch = async (req,res)=>{
    let q = req.query.q;
    try {
        console.log(q)
        let items = await Grocerry.find({ "name": { "$regex": q, "$options": "i" } });

        res.status(200).send(items);
    } catch (error) {
        console.log(error)
        res.status(401).send({ "err": "Somthing went wrong" })
    }
}

exports.GetAllItembyId=async(req,res)=>{
    let id = req.params.id.split(":").map(String)[1];
    console.log(id)
    try {
        let item = await Grocerry.findOne({_id:id});
        return res.status(200).send(item);
    } catch (error) {
        console.log(error)
        res.status(401).send({ "err": "Somthing went wrong" })
    }
}

exports.UpdateGrocerry = async(req,res)=>{
    const id = req.params.id.split(":").map(String)[1]
    const payload = req.body
    try {
        await Grocerry.findByIdAndUpdate({ _id: id }, payload)
        res.status(200).send({ message: "Grocerry item updated successfully" })
    } catch (error) {
        console.log(error)
        res.status(401).send({ "err": "Somthing went wrong" })
    }
}

exports.Remove = async (req, res) => {
    const id = req.params.id.split(":").map(String)[1]
    const Item = await Grocerry.findById(id);

    if (!Item) {
        return res.status(401).send({ message: "Product allredy deleted from product" });
    } else {
        try {
            await Grocerry.findOneAndDelete({"_id":id});
            res.status(200).send({ message: "Product item deleted successfully" })
        } catch (error) {
            console.log(error)
            res.status(400).send({ "err": "Somthing went wrong" })
        }
    }
}