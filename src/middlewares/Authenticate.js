const { StatusCode, StatusMessage } = require("../config/StatusCode")
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./debug.env" });

const Authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(StatusCode.UnAuthorized).json({ error: StatusMessage.UnAuthorized })
    };
    try {
        req.account = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(StatusCode.Forbidden).json({ error: StatusMessage.Forbidden });
    }
};

module.exports = Authenticate;