const { makeGETRequest } = require('../httpservice.js');
const querystring = require(`querystring`);


export.getShipData = async () => {
    const shipDataRequest = querystring.stringify({
        application_id: '',
        fileds: 'Battleship',
    })
}