const Ship = require('./models/ShipDataModel');


function processShipData(apiData) {
    const ships = Object.entries(apiData).map(([id, shipData]) =>({
        id: parseInt(id, 10),
        name: shipData.name || 'Unknown',
        level: null,
        nation: { name: '', icon: '' },
        class: { name: '', icon: '' },
    }));
    console.log('Полученные корабли:', ships);
    return ships;
};


async function saveShips(ships){
    try {
      
        if (!Array.isArray(data)) {
            throw new Error('Данные должны быть массивом');
        }
        const savedShips = await Ship.insertMany(data, { ordered: false });
        console.log('Данные успешно сохранены в базу:', savedShips);
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
    }
} 



module.exports = processShipData;
