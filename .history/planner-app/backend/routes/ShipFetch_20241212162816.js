const express = require('express');
const  getShipData  = require('../controllers/shipDataController')


const router = express.Router();

router.get('/ships', async (req, res) => {
    try {
        const shipData = await getShipData();
        res.json(shipData);
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
});

module.exports = router;