const redisClient = require('../../services/redisClient');


async function saveToCache(key, data, ttl = 600) {
    try{
        await redisClient.set(key, JSON.stringify(data), {EX: ttl});
        console.log(`Data is cached - succes! ${key}`);
    }catch(error){
        console.error("Eroor while try to cache", error);
    }
}

async function getFromCache(key) {
    try{
            const data = await redisClient.get(key);
            return data ? JSON.parse(data) : null;
    }catch(error){
        console.error("Error reading from Redis", error);
        return null;
    }
}
async function cacheHasKey(key) {
    const value = await redisClient.exists(key);
    return value === 1;
}

async function deleteFromCache(key) {
    try{
        await redisClient.del(key);
        console.log(`Delete data complete: ${key}`);
    }catch(error){
        console.error("Error del data Redis:", error);
    }
}

module.exports = { saveToCache, getFromCache, cacheHasKey, deleteFromCache};