const express = require('express');
const router = express.Router();
const { getUserData } = require('../../../controllers/DBApiControllers/getDataProfileDBController');

router.get('/user', getUserData);


module.exports = router;