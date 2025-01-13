const express = require('express');
import { getShipData } = require('../controllers/shipDataController')


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
