var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postsController');

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/new', postsController.newPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;