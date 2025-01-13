const { makeGETRequest } = require('../httpservice.js');
const querystring = require(`querystring`);


export.getShipData = async () => {
    const shipDataRequest = querystring.stringify({
        application_id: 'dbd5754ce93a204aa7632c155fe229b7',
        fileds: 'Battleship',
    });

    const apiResponse = await makeGETRequest('https://api.worldofwarships.eu/wows/encyclopedia/ships/?' + shipDataRequest);
}