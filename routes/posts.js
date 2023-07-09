const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');

// CREATE
router.post('/', postsController.createPost);

// READ ALL POSTS
router.get('/', postsController.getPosts);

// READ SPECIFIC POST
router.get('/:postCode', postsController.getPostById);

// UPDATE
router.put('/:postCode', postsController.updatePost);

// DELETE
router.delete('/:postCode', postsController.deletePost);

module.exports = router;