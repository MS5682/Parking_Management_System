var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');

// mobile api
router.get('/getParkingLotsStatus', apiController.getParkingLotsStatus);

module.exports = router;

