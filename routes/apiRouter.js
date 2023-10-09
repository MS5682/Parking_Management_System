var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');

// mobile api
router.get('/getParkingLotsStatus', apiController.getParkingLotsStatus);
router.get('/parkingLotCarInformation', apiController.getParkingLotCarInformation);
router.post('/getMyCarLocation', apiController.getMyCarLocation);
module.exports = router;

