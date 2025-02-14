const express = require('express');
const router = express.Router();

const requestMapRoutes = require('./requestToDB/requestMap');
const requestProfileRoutes = require('./requestToDB/requestProfile');
const requestShipRoutes = require('./requestToDB/requestShip');
const middlewareCheck = require('../../middlewareValidator/middlewareCheck');

router.use('/mapstorage', middlewareCheck, requestMapRoutes);
router.use('/profile', requestProfileRoutes);
router.use('/ship', requestShipRoutes);

module.exports = router;