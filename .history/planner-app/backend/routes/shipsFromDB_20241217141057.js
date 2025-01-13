const express = require('express');
const router = express.Router();
const { getShipById, getAllShipNames }  = require('../controllers/shipDbController');


router.get('/name-search', getShipById );
router.get('/name-allships', getAllShipNames );
// router.get('/class-search',  );
// router.get('/tier-search',  );


module.exports = router;