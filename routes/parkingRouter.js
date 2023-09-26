var express = require('express');
var router = express.Router();
const parkingController = require('../controllers/parkingController');

router.get('/:floor', parkingController.getCarList);

module.exports = router;

