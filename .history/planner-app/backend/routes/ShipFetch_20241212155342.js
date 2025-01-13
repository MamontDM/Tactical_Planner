const express = require('express');
const { makeGETRequest } = require('../httpservice.js');
const querystring = require('querystring');
const router = express.Router();
const { processShipData } = require('./dataProcessor.js');



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
