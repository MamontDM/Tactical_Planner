const express = require('express');
const router = express.Router();
const getData = require('../../controllers/externalApiControllers/userDataController');

router.get('/playerData', getData.getProfileData);

module.exports = router;