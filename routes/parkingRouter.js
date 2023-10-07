var express = require('express');
var router = express.Router();
const parkingController = require('../controllers/parkingController');

function checkAdminSession(req, res, next) {
    if (!req.session.admin) {
      res.redirect('/user/login');
    } else {
      next();
    }
  } 

router.get('/:floor', parkingController.getCarList);
router.post('/info', checkAdminSession, parkingController.updateParking);

module.exports = router;

