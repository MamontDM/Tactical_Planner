const express = require('express');
const router = express.Router();
const { getUserMaps, createMap, deleteMap } = require('../../../controllers/DBApiControllers/mapStorageDBController');

router.get('/getmap', getUserMaps );
router.post('/savemap', createMap );
router.delete('/deletemap/:id', deleteMap );

module.exports = router;