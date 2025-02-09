require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
    app_id: process.env.APP_ID,
    mongoUri: ENV === "production" ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV,
    sessionSecret: process.env.SESSION_SECRET,
    PORT: process.env.PORT || 5000,
    isProduction: ENV === "production",
    prodFrontOrigins: process.env.RENDER_FRONT_ORIGIN,
    prodServOrigins: process.env.RENDER_ORIGIN,
    devServOrigins: process.env.DEV_BACK,
    devFrontOrigins: process.env.DEV_FRONT,
    domainDEV: process.env.DEV_DOMAIN,
    domainPROD: process.env.PROD_DOMAIN,
    redisPROD: process.env.REDIS_PROD_URL, 
    redisDEV: process.env.REDIS_DEV_URL,
};
