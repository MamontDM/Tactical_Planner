const express = require('express');
const router = express.Router();
const { getShipById, getAllNames }  = require('../controllers/shipDbController');


router.get('/name-search', getShipById );
router.get('/name-allships', getAllNames );
// router.get('/class-search',  );
// router.get('/tier-search',  );


module.exports = router;