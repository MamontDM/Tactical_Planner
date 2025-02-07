const redis = require('redis');
const {isProduction, redisDEV, redisPROD} = require('../config');

const redisUrl = isProduction ? redisPROD : redisDEV;
const redisClient = redis.createClient({url: redisUrl});

redisClient.on("connect", () => console.log(` Redis подключен: ${redisUrl} (режим: ${isProduction ? "PROD" : "DEV"})`));
redisClient.on("error", (err) => console.error(" Redis ошибка:", err));
redisClient.on("end", () => console.log(" Redis соединение закрыто."));


(async () => {
    try{
        await redisClient.connect();
        console.log(`Connecting to Redis on: ${redisUrl}`)
    }catch(error){
        console.error("failed to connect:", error);
    }
})();

module.exports = redisClient;