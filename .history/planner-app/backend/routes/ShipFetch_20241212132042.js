const { makeGETRequest } = require('../httpservice.js');
const querystring = require(`querystring`);


module.export.getShipData = async () => {
    const shipDataRequest = querystring.stringify({
        application_id: 'dbd5754ce93a204aa7632c155fe229b7',
        fileds: 'Battleship',
    });

    const apiResponse = await makeGETRequest('https://api.worldofwarships.eu/wows/encyclopedia/ships/?' + shipDataRequest);
    if (!apiResponse || !apiResponse.data) {
        console.log('Ошибка: данные не получены от API');
        return res.status(500).json({ error: 'Ошибка при получении данных от API' });
      }

      function processShipData(apiResponse){
        console.log(JSON.stringify(apiResponse, 0 , 2));
    };

}