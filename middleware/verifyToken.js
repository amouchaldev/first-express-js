const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) return res.status(200).json({success:false, message: "Error! Token was not provided."});
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decode.user
    }
    catch (err) {
        res.status(200).json({success:false, message: "Error! Invalid Token."});
    }
    return next()
}

module.exports = verifyToken