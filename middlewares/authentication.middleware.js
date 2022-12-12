const jwt = require("jsonwebtoken");

const authentication = (req,res,next)=>{
    const token = req.headers?.authorization;
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.body.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).send({"message":"Please login again"});
    }
}

module.exports = {authentication};