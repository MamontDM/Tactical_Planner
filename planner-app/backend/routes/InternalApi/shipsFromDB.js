const express = require('express');
const router = express.Router();
const { getShipById, getAllShipNames }  = require('../../controllers/InternalApiControllers/shipDbController');


router.get('/id-search', getShipById );
router.get('/name-allships', getAllShipNames );


module.exports = router;