const express = require('express');
const router = express.Router();
const shipDbController = require('../controllers/shipDbController');

router.get('/name-search', shipDbController );