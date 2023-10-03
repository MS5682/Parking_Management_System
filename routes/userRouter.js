var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
function checkSession(req, res, next) {
    if (!req.session.user) {
      res.redirect('/user/login');
    } else {
      next();
    }
  } 

router.post('/join', userController.join);
router.get('/login', function(req, res, next) {res.render('login');});
router.post('/login', userController.adminLogin);
router.get('/list', checkSession, userController.getUserList);
router.get('/update/:id', checkSession, userController.getUserInfo);
router.get('/updateCar/:id', checkSession, userController.getUserCarInfo);
router.post('/update/:id', checkSession, userController.updateUserInfo);
router.post('/delete/:id', checkSession, userController.deleteUserInfo);
router.post('/updateCar/:current/:new', checkSession, userController.updateUserCar);
router.post('/addCar/:id/:car_number', checkSession, userController.addUserCar);
router.post('/deleteCar/:car_number', checkSession, userController.deleteUserCar);

// user login 추가
router.post('/userLogin', userController.userLogin);

module.exports = router;

