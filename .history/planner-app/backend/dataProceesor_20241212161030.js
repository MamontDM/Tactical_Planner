const Ship = require('./models/ShipDataModel');


function processShipData(apiData) {
    const ships = Object.entries(apiData).map(([id, shipData]) =>({
        id: parseInt(id, 10),
        name: shipData.name || 'Unknown',
        level: null,
        nation: { name: '', icon: '' },
        class: { name: '', icon: '' },
    }));
    console.log('Обработанные данные кораблей:', ships);
    return ships;
}

module.exports = {
    processShipData,
};
