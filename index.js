const express = require("express");
const cors = require("cors");
const { signuRoute } = require("./routes/sign-up-route");
const { loginRoute } = require("./routes/login-route");
const connect = require("./config/db");
const { authentication } = require("./middlewares/authentication");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(cors());

app.use("/",signuRoute)
app.use("/",loginRoute)
// app.use("/",authentication)

app.listen(PORT, async () => {
    await connect();
    console.log(`Listening at http://localhost:${PORT}`);
})