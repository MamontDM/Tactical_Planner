const express = require('express');


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
};
