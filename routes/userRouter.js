var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
function checkSessionAndUserType(req, res, next) {
    if (!req.session.user) {
      res.redirect('/user/login');
    } else if (req.session.user.user_code !== '1') {
      res.redirect('/');
    } else {
      next();
    }
  } 

router.post('/join', userController.join);
router.get('/login', function(req, res, next) {res.render('login');});
router.post('/login', userController.login);
router.get('/forget', function(req, res, next) {res.render('forget');});
router.get('/id', userController.findId);
router.post('/password', userController.changePw);
router.get('/list', checkSessionAndUserType, userController.getUserList);
router.get('/update/:id', checkSessionAndUserType, userController.getUserInfo);
router.post('/update/:id', checkSessionAndUserType, userController.updateUserInfo);
router.post('/delete/:id', checkSessionAndUserType, userController.deleteUserInfo);
module.exports = router;

