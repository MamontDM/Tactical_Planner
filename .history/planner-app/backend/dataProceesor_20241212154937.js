

function processShipData(apiData) {
    console.log('Данные кораблей:', JSON.stringify(apiData, null, 2));
    

    return apiData;
}

module.exports = {
    processShipData,
};
