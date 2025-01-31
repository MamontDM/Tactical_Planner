const express = require('express');
const router = express.Router();
const authController = require('../../controllers/externalApiControllers/authenticationController');

router.get('/login', authController.login);
router.get('/response', authController.response);
router.get('/status', authController.checkAuthStatus); 
router.post('/logOut', authController.logOut);

module.exports = router;