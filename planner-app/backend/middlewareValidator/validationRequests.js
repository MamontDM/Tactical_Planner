const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;

            if(!token){
                return res.status(401).json({error: "Token .... lost! "})
            }
        
        const decoded = jwt.verify(token, jwt_secret);

        if (!decoded.access_token) {
            return res.status(401).json({ error: "Токен недействителен" });
        }


        req.access_token = decoded.access_token;
        req.account_id = decoded.account_id;

        next();
    } catch (error) {
        console.error('Auth problem!', error.message);
        res.status(401).json({error: 'Invalid Token'});
    }
}