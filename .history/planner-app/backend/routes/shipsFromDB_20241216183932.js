const express = require('express');
const router = express.Router();
const  getShipByName  = require('../controllers/shipDbController');

console.log("getShipbyName:", getShipbyName);
router.get('/name-search', getShipByName );
// router.get('/nation-search',  );
// router.get('/class-search',  );
// router.get('/tier-search',  );


module.exports = router;