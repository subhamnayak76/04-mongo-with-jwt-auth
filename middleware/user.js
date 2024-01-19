const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const JwToken = words[1]
    const decodedValue = jwt.verify(JwToken,JWT_SECRET)
    if(decodedValue.username){
        req.username = decodedValue.username
        next()
    }
    else{
        res.json({
            msg : "user is not authenticated"
        })
    }
}


module.exports = userMiddleware;