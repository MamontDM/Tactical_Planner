const express = require('express');
const { getShipData } = require('../controllers/shipDataController')


const router = express.Router();

router.get('/ships', async (req, res) => {
    try {
        const shipData = await getShipData();
        res.json(shipData);
    } catch (error) {
        res.status(500).json({ error: 'hehelo'});
    }
});

module.exports = router;