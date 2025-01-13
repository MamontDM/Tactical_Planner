const Ship = require('../../models/ShipDataModel');


function processShipData(apiData) {
    const ships = Object.entries(apiData).map(([id, shipData]) =>({
        id: parseInt(id, 10),
        name: shipData.name || 'Unknown',
        tier: shipData.tier,
        nation: shipData.nation,
        class: shipData.type,
        images: shipData.images?.medium,
    }));
    console.log('Полученные корабли:', ships);
    return ships;
};

module.exports = processShipData;