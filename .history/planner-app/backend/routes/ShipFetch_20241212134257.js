const express = require('express');
const { makeGETRequest } = require('../httpservice.js');
const querystring = require('querystring');
const router = express.Router();


const getShipData = async () => {
    try {
        const shipDataRequest = querystring.stringify({
            application_id: 'dbd5754ce93a204aa7632c155fe229b7',
            fields: 'name',
        });

        const apiResponse = await makeGETRequest(
            'https://api.worldofwarships.eu/wows/encyclopedia/ships/?' + shipDataRequest
        );

        if (!apiResponse || !apiResponse.data) {
            console.error('API ответ неверный:', apiResponse);
            throw new Error('Ошибка при получении данных от API');
        }

        const processedData = processShipData(apiResponse.data);
        return processedData;
    } catch (error) {
        console.error('Ошибка при выполнении getShipData:', error.message);
        throw error;
    }
};


function processShipData(apiData) {
    console.log('Данные кораблей:', JSON.stringify(apiData, null, 2));
    return apiData; 
}


router.get('/', async (req, res) => {
    try {
        const shipData = await getShipData();
        res.json(shipData);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных о кораблях' });
    }
});

module.exports = {
    router,
    getShipData,  
};
