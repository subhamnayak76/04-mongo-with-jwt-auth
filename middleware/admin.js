// Middleware for handling auth
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const jwToken = words[1]
    const decodedvalue = jwt.verify(jwToken,JWT_SECRET)
    if(decodedvalue.username){
        next()
    }
    else{
        res.json({
            msg : "user is not authorize "
        })
    }
}

module.exports = adminMiddleware;