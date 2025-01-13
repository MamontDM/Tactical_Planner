const querystring = require('querystring');
const processShipData  = require('../dataProceesor.js');
const { makeGETRequest }  = require('../httpservice.js');
const Ship = require('../models/ShipDataModel.js');


const getShipData = async () => {
    try {
        const shipDataRequest = querystring.stringify({
            application_id: 'dbd5754ce93a204aa7632c155fe229b7',
            fields: 'ship_id',
        });

        const apiResponse = await makeGETRequest(
            'https://api.worldofwarships.eu/wows/encyclopedia/ships/?' + shipDataRequest
        );

        if (!apiResponse || !apiResponse.data) {
            console.error('API ответ неверный:', apiResponse);
            throw new Error('Ошибка при получении данных от API');
        }
        console.log('Обработка данных...');
        const processedData = processShipData(apiResponse.data);

        if (!Array.isArray(processedData) || processedData.length === 0) {
            throw new Error('Обработанные данные пусты или неверного формата');
        }
       
        console.log(`Добавление ${processedData.length} записей в базу данных...`);
        await Ship.insertMany(processedData, {ordered: false});
        console.log('Данные успешно сохранены в базу.');
        return processedData;
    } catch (error) {
        console.error('Ошибка при выполнении getShipData:', error.message);
        throw error;
    }
};


module.exports = getShipData;