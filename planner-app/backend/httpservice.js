const axios = require('axios');

const makeGETRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data; 
    } catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', error.message);
        throw error;
    }
};

module.exports = { makeGETRequest };