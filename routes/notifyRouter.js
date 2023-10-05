var express = require('express');
var router = express.Router();
const notifyController = require('../controllers/notifyController');
function checkAdminSession(req, res, next) {
    if (!req.session.admin) {
      res.redirect('/user/login');
    } else {
      next();
    }
  } 

router.get('/', checkAdminSession, notifyController.getNotification);
router.post('/delete/:notify_id', checkAdminSession, notifyController.deleteNotification);

module.exports = router;

