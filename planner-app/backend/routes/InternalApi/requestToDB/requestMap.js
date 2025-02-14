const express = require('express');
const router = express.Router();
const { getUserMaps, createMap, deleteMap } = require('../../../controllers/DBApiControllers/mapStorageDBController');

router.get('/user-data/getmap', getUserMaps );
router.post('/user-data/savemap', createMap );
router.get('/user-data/deletemap', deleteMap );

module.exports = router;