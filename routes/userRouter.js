var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/join', function(req, res, next) {res.render('join');});
router.post('/join', userController.join);
router.get('/login', function(req, res, next) {res.render('login');});
router.post('/login', userController.login);
router.get('/id', userController.findId);
router.get('/password', userController.changePw);

module.exports = router;

