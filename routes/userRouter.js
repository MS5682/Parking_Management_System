var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
function checkAdminSession(req, res, next) {
    if (!req.session.admin) {
      res.redirect('/user/login');
    } else {
      next();
    }
  } 

router.post('/join', userController.join);
router.get('/login', function(req, res, next) {res.render('login');});
router.post('/login', userController.adminLogin);
router.get('/list', checkAdminSession, userController.getUserList);
router.get('/update/:id', checkAdminSession, userController.getUserInfo);
router.get('/updateCar/:id', checkAdminSession, userController.getUserCarInfo);
router.post('/update/:id', checkAdminSession, userController.updateUserInfo);
router.post('/delete/:id', checkAdminSession, userController.deleteUserInfo);
router.post('/updateCar/:current/:new', checkAdminSession, userController.updateUserCar);
router.post('/updateCarVistor/:car_number/:visitor', checkAdminSession, userController.updateCarVisitor);
router.post('/addCar/:id/:car_number/:visitor', checkAdminSession, userController.addUserCar);
router.post('/deleteCar/:car_number', checkAdminSession, userController.deleteUserCar);

// user login 추가
router.post('/userLogin', userController.userLogin);

module.exports = router;

