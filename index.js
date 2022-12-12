const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { authRoutes } = require("./routes/auth.routes");
const { todoRoutes } = require("./routes/todo.routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome in todo application");
})

app.use("/auth",authRoutes);
app.use("/todos",todoRoutes);

app.listen(PORT,async ()=>{
    try {
        await connection;
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error while connecting to db",{error});
    }
    console.log(`server runing on port http://localhost:${PORT}/`)
})