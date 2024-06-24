const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    //Bearer <actualtoken>
    const words = token.split(" ");
    const jwtToken = words[1];
    try{
        const decodedValue = jwt.verify(jwtToken,jwt_secret)
        if(decodedValue.username){
            req.username = decodedValue.username;
            next();
        }else{
            res.json({
                msg:"Authorization not successful"
            })
        }

    }catch(e){
        res.json({
            msg:"Incorrect Inputs"
        })
    }
}


module.exports = userMiddleware;