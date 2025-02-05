const express = require('express');
const router = express.Router();
const { getShipById, getAllShipNames }  = require('../../controllers/DBApiControllers/shipDbController');
const { getUserData } = require('../../controllers/DBApiControllers/getDataProfileDBController')


router.get('/ship/id-search', getShipById );
router.get('/ship/name-allships', getAllShipNames );
router.get('/user/profile', getUserData);


module.exports = router;