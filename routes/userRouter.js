var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
function checkSessionAndUserType(req, res, next) {
    if (!req.session.user) {
      res.redirect('/user/login');
    } else {
      next();
    }
  } 

router.post('/join', userController.join);
router.get('/login', function(req, res, next) {res.render('login');});
router.post('/login', userController.adminLogin);
router.get('/list', checkSessionAndUserType, userController.getUserList);
router.get('/update/:id', checkSessionAndUserType, userController.getUserInfo);
router.get('/updateCar/:id', checkSessionAndUserType, userController.getUserCarInfo);
router.post('/update/:id', checkSessionAndUserType, userController.updateUserInfo);
router.post('/delete/:id', checkSessionAndUserType, userController.deleteUserInfo);
router.post('/updateCar/:current/:new', checkSessionAndUserType, userController.updateUserCar);
router.post('/addCar/:id/:car_number', checkSessionAndUserType, userController.addUserCar);
router.post('/deleteCar/:car_number', checkSessionAndUserType, userController.deleteUserCar);

// user login 추가
router.post('/userLogin', userController.userLogin);

module.exports = router;

