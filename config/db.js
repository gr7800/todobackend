const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const connect = async ()=>{
    try {
        const connection = mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology: true,
            useNewUrlparser: true,
        })
        await connection
        console.log("Connection secure")
    } catch (error) {
        console.log(`Connection Error ${error}`);
        process.exit(1)
    }
};

module.exports = connect