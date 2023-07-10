const Post = require('../models/Post');
const Board = require('../models/Board');
const Comment = require('../models/Comment');

exports.getCommentsByPost = (req, res) => {
    const post_code = req.params.post_code;
    Comment.getCommentsByPost(post_code, (comments) => {
        Post.getPostById(post_code, (post) => {
            Board.getBoardbyId(post.board_code, (boards) => {
                res.render('comments', { comments: comments, post: post, boards: boards });
            });
        });
    });
};