const express = require('express');
const router = express.Router();
const shipDbController = require('../controllers/shipDbController');

router.get('/name-search', shipDbController );
router.get('/nation-search', shipDbController );
router.get('/type-search', shipDbController );
router.get('/tier-search', shipDbController );


module.exports = router;