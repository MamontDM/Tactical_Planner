const axios = require('axios');

const makeGETRequest = async (url) => {
    try {
        console.log(url);
        const response = await axios.get(url);
        return response.data; 
    } catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', error.message);
        throw error;
    }
};

const makePOSTRequest = async (url) => {
    try {
        const response = await axios.post(url);
        return response.data; 
    } catch (error) {
        console.error('Ошибка при выполнении GET-запроса:', error.message);
        throw error;
    }
};


module.exports = { makeGETRequest, makePOSTRequest };