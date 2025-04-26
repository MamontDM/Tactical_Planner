const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config');

module.exports = async (req, res, next) => {
    console.log('Called middlware')
    
    try {
        const token = req.cookies?.access_token;
        if(!token){
            return res.status(401).json({error: "Token .... lost! "})
        }
        const decoded = jwt.verify(token, jwt_secret);
        console.log(decoded);
        if (!decoded.token) {
            return res.status(401).json({ error: "midlleware blocked" });
        }

        req.body.access_token = decoded.access_token;
        req.body.account_id = decoded.account_id;

        next();
    } catch (error) {
        console.error('Auth problem!', error.message);
        if(!res.headersSent) {
            res.status(401).json({error: 'Invalid Token'});
        }
    }
}