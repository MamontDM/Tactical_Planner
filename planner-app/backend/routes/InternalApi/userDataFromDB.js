const express = require('express');
const router = express.Router();
const userData = require('../../controllers/InternalApiControllers/userDataFromDB')

router.post('/mapStorage', userCacheController.addMaps);

module.exports = router;