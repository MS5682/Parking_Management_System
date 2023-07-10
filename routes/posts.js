const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');

//게시판 글 목록
router.get('/boards/:board_code', postsController.getPosts);

//게시글 보기
router.get('/boards/:board_code/:post_code', postsController.getPostById);



// CREATE
router.post('/', postsController.createPost);

// READ ALL POSTS
router.get('/', postsController.getPosts);

// UPDATE
router.put('/:postCode', postsController.updatePost);

// DELETE
router.delete('/:postCode', postsController.deletePost);

module.exports = router;