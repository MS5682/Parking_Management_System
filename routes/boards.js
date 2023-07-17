const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');
const postsRouter = require('./posts');
router.use('/:boardCode/posts', postsRouter);

router.get('/', boardsController.getBoards);//Get all boards
router.delete('/:boardCode', boardsController.deleteBoard);
router.post('/', boardsController.createBoard);
module.exports = router;
