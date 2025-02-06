require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
    app_id: process.env.APP_ID,
    mongoUri: ENV === "production" ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV,
    sessionSecret: process.env.SESSION_SECRET,
    PORT: process.env.PORT || 5000,
    isProduction: ENV === "production",
    allowedOrigins: [
        process.env.CORS_ORIGIN, 
        process.env.VERCEL_ORIGIN
    ]
};
