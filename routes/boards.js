const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');
const postsRouter = require('./posts');
router.use('/:boardCode/posts', postsRouter);

function checkAdminSession(req, res, next) {
    if (!req.session.admin) {
      res.redirect('/user/login');
    } else {
      next();
    }
  } 

router.get('/', boardsController.getBoards);//Get all boards
router.delete('/:boardCode', checkAdminSession, boardsController.deleteBoard);
router.post('/', checkAdminSession,  boardsController.createBoard);
module.exports = router;
