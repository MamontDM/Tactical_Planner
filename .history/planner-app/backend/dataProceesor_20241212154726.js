function processShipData(apiData) {
    console.log('Данные кораблей:', JSON.stringify(apiData, null, 2));
    // Здесь вы можете выполнить любую обработку данных
    return apiData;
}

module.exports = {
    processShipData,
};
