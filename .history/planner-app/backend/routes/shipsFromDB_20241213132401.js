const express = require('express');
const router = express.Router();
const {getShipbyName} = require('../controllers/shipDbController');

router.get('/name-search', getShipsByName );
router.get('/nation-search', shipDbController );
router.get('/type-search', shipDbController );
router.get('/tier-search', shipDbController );


module.exports = router;