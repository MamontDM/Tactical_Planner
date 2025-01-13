const express = require('express');
const router = express.Router();
const { getShipbyName, } = require('../controllers/shipDbController');

router.get('/name-search', getShipsByName );
// router.get('/nation-search',  );
// router.get('/class-search',  );
// router.get('/tier-search',  );


module.exports = router;