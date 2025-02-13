const express = require('express');
const router = express.Router();

const requestMapRoutes = require('./requestToDB/requestMap');
const requestProfileRoutes = require('./requestToDB/requestProfile');
const requestShipRoutes = require('./requestToDB/requestShip');

router.use('/map', requestMapRoutes);
router.use('/profile', requestProfileRoutes);
router.use('/ship', requestShipRoutes);

module.exports = router;