const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');
router.get('/', boardsController.getBoards);
router.get('/:boardCode', boardsController.getBoardById);
router.post('/', boardsController.createBoard);
router.put('/:boardCode', boardsController.updateBoard);
router.delete('/:boardCode', boardsController.deleteBoard);
module.exports = router;