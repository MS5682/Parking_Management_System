var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/join', userController.join);
router.get('/login', function(req, res, next) {res.render('login');});
router.post('/login', userController.login);
router.get('/forget', function(req, res, next) {res.render('forget');});
router.get('/id', userController.findId);
router.post('/password', userController.changePw);
router.get('/list', userController.getUserList);
router.get('/update/:id', userController.getUserInfo);
router.post('/update/:id', userController.updateUserInfo);
router.post('/delete/:id', userController.deleteUserInfo);

module.exports = router;

